'use strict'

// code copied and refactored from https://github.com/VT-CHCI/google-scholar
// for usage limits see https://developers.google.com/webmaster-tools/search-console-api-original/v3/limits

const request = require('request')
const cheerio = require('cheerio')
const striptags = require('striptags')
const throttledQueue = require('throttled-queue')

const perSecThrottle = throttledQueue(50, 1000)
const perMinThrottle = throttledQueue(1200, 60 * 1000)
const resultsPerPage = 10

const googleScholarUrl = 'https://scholar.google.com/scholar?hl=en&q='
const googleScholarUrlPrefix = 'https://scholar.google.com'

const ellipsis = '&#x2026;'
const etAlStr = 'et al.'
const citeCountPre = 'Cited by '
const relatedPre = 'Related articles'

const statusCodeForRateLimit = 503
const statusMessageForRateLimit = 'Service Unavailable'
const statusMessageBody =
  'This page appears when Google automatically detects requests coming from your computer network which appear to be in violation of the <a href="//www.google.com/policies/terms/">Terms of Service</a>. The block will expire shortly after those requests stop.'

// regex with thanks to http://stackoverflow.com/a/5917250/1449799
const resultCountRe = /\W*((\d+|\d{1,3}(,\d{3})*)(\.\d+)?) results/

const scholarResultsCallback = (resolve, reject) => (error, response, html) => {
  if (error) {
    reject(error)
  } else if (response.statusCode !== 200) {
    if (
      response.statusCode === statusCodeForRateLimit &&
      response.statusMessage === statusMessageForRateLimit &&
      response.body.indexOf(statusMessageBody) > -1
    ) {
      reject(
        new Error(
          'you are being rate-limited by google. you have made too many requests too quickly. see: https://support.google.com/websearch/answer/86640'
        )
      )
    } else {
      reject(
        new Error(
          'expected statusCode 200 on http response, but got: ' +
            response.statusCode
        )
      )
    }
  } else {
    const $ = cheerio.load(html)

    const results = $('.gs_r.gs_or.gs_scl')
    let resultCount = 0
    let nextUrl = ''
    let prevUrl = ''
    if (
      $('.gs_ico_nav_next')
        .parent()
        .attr('href')
    ) {
      nextUrl =
        googleScholarUrlPrefix +
        $('.gs_ico_nav_next')
          .parent()
          .attr('href')
    }
    if (
      $('.gs_ico_nav_previous')
        .parent()
        .attr('href')
    ) {
      prevUrl =
        googleScholarUrlPrefix +
        $('.gs_ico_nav_previous')
          .parent()
          .attr('href')
    }

    const processedResults = []
    results.each((i, r) => {
      $(r)
        .find('.gs_ri h3 span')
        .remove()
      const title = $(r)
        .find('.gs_ri h3')
        .text()
        .trim()
      const url = $(r)
        .find('.gs_ri h3 a')
        .attr('href')
      const authorNamesHTMLString = $(r)
        .find('.gs_ri .gs_a')
        .html()
      let etAl = false
      let etAlBegin = false
      let authors = []
      const abstract = $(r)
        .find('.gs_ri .gs_rs')
        .text()
      const footerLinks = $(r).find('.gs_ri .gs_fl a')
      let citedCount = 0
      let citedUrl = ''
      let relatedUrl = ''
      const pdfUrl = $($(r).find('.gs_ggsd a')[0]).attr('href')

      if (
        $(footerLinks[0])
          .text()
          .indexOf(citeCountPre) >= 0
      ) {
        citedCount = $(footerLinks[0])
          .text()
          .substr(citeCountPre.length)
      }
      if (
        $(footerLinks[0]).attr &&
        $(footerLinks[0]).attr('href') &&
        $(footerLinks[0]).attr('href').length > 0
      ) {
        citedUrl = googleScholarUrlPrefix + $(footerLinks[0]).attr('href')
      }
      if (footerLinks && footerLinks.length && footerLinks.length > 0) {
        if (
          $(footerLinks[0]).text &&
          $(footerLinks[0])
            .text()
            .indexOf(citeCountPre) >= 0
        ) {
          citedCount = $(footerLinks[0])
            .text()
            .substr(citeCountPre.length)
        }

        if (
          $(footerLinks[1]).text &&
          $(footerLinks[1])
            .text()
            .indexOf(relatedPre) >= 0 &&
          $(footerLinks[1]).attr &&
          $(footerLinks[1]).attr('href') &&
          $(footerLinks[1]).attr('href').length > 0
        ) {
          relatedUrl = googleScholarUrlPrefix + $(footerLinks[1]).attr('href')
        }
      }
      if (authorNamesHTMLString) {
        let cleanString = authorNamesHTMLString.substr(
          0,
          authorNamesHTMLString.indexOf(' - ')
        )
        if (
          cleanString.substr(cleanString.length - ellipsis.length) === ellipsis
        ) {
          etAl = true
          cleanString = cleanString.substr(
            0,
            cleanString.length - ellipsis.length
          )
        }
        if (cleanString.substr(0, ellipsis.length) === ellipsis) {
          etAlBegin = true
          cleanString = cleanString.substr(ellipsis.length + 2)
        }
        const htmlAuthorNames = cleanString.split(', ')
        if (etAl) {
          htmlAuthorNames.push(etAlStr)
        }
        if (etAlBegin) {
          htmlAuthorNames.unshift(etAlStr)
        }
        authors = htmlAuthorNames.map(name => {
          const tmp = cheerio.load(name)
          const authorObj = {
            name: '',
            url: '',
          }
          if (tmp('a').length === 0) {
            authorObj.name = striptags(name)
          } else {
            authorObj.name = tmp('a').text()
            authorObj.url = googleScholarUrlPrefix + tmp('a').attr('href')
          }
          return authorObj
        })
      }

      processedResults.push({
        title,
        url,
        authors,
        abstract,
        citedCount,
        citedUrl,
        relatedUrl,
        pdfUrl,
      })
    })

    const resultsCountString = $('#gs_ab_md').text()
    if (resultsCountString && resultsCountString.trim().length > 0) {
      const matches = resultCountRe.exec(resultsCountString)
      if (matches && matches.length > 0) {
        resultCount = parseInt(matches[1].replace(/,/g, ''))
      } else {
        resultCount = processedResults.length
      }
    } else {
      resultCount = processedResults.length
    }

    resolve({
      results: processedResults,
      count: resultCount,
      nextUrl,
      prevUrl,
      next: () =>
        new Promise((resolve, reject) => {
          perMinThrottle(() => {
            perSecThrottle(() => {
              const requestOptions = {
                jar: true,
                url: nextUrl,
              }
              request(requestOptions, scholarResultsCallback(resolve, reject))
            })
          })
        }),
      previous: () =>
        new Promise((resolve, reject) => {
          perMinThrottle(() => {
            perSecThrottle(() => {
              const requestOptions = {
                jar: true,
                url: prevUrl,
              }
              request(requestOptions, scholarResultsCallback(resolve, reject))
            })
          })
        }),
    })
  }
}

const search = query =>
  new Promise(function(resolve, reject) {
    perMinThrottle(() => {
      perSecThrottle(() => {
        const requestOptions = {
          jar: true,
          url: encodeURI(googleScholarUrl + query),
        }
        request(requestOptions, scholarResultsCallback(resolve, reject))
      })
    })
  })

const all = query =>
  search(query).then(results => {
    // n results but have 10 already so n - 10 results on following pages
    const remainingResults = results.count - results.results.length
    if (remainingResults > 0) {
      const pagesRemaining = Math.ceil(remainingResults / resultsPerPage)
      return Promise.all(
        Array(pagesRemaining)
          .fill()
          .map((el, i) =>
            search(query + '&start=' + (i + 1) * resultsPerPage).then(
              laterPages => laterPages.results
            )
          )
      ).then(remainingResults => {
        console.log('remainingResults :', remainingResults)
        const allResults = results.results.concat(
          remainingResults.reduce((acc, res) => acc.concat(res))
        )
        results.results = allResults
        results.nextUrl = null
        results.next = null
        results.prevUrl = null
        results.prev = null
        return results
      })
    }
  })

module.exports = { search, all }
