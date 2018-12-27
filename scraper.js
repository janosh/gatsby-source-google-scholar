'use strict'

// code copied and refactored from https://github.com/VT-CHCI/google-scholar
// for usage limits see https://developers.google.com/webmaster-tools/search-console-api-original/v3/limits

const request = require('request')
const cheerio = require('cheerio')

const processResults = require('./processor')

const resultsPerPage = 10
const googleScholarUrl = 'https://scholar.google.com/scholar?hl=en&q='
const scholarUrl = 'https://scholar.google.com'

const statusCodeForRateLimit = 503
const statusMessageForRateLimit = 'Service Unavailable'
const statusMessageBody = `
  This page appears when Google automatically detects requests
  coming from your computer network which appear to be in violation
  of the <a href="//www.google.com/policies/terms/">Terms of Service</a>.
  The block will expire shortly after those requests stop.
`

// regex with thanks to http://stackoverflow.com/a/5917250/1449799
const resultCountRegex = /\W*((\d+|\d{1,3}(,\d{3})*)(\.\d+)?) results/

const scholarResultsCallback = (resolve, reject) => (error, response, body) => {
  if (error) return reject(error)
  if (response.statusCode !== 200) {
    if (
      response.statusCode === statusCodeForRateLimit &&
      response.statusMessage === statusMessageForRateLimit &&
      response.body.includes(statusMessageBody)
    ) {
      return reject(
        new Error(`
          You have made too many requests too quickly and are being rate-limited
          by Google Scholar. See: https://support.google.com/websearch/answer/86640.
          You might try to visit scholar.google.com and solve a captcha to unblock your IP
          or use a VPN.
        `)
      )
    } else {
      return reject(
        new Error(
          `Expected status code 200 on Google Scholar http response, but got ${
            response.statusCode
          }.`
        )
      )
    }
  }
  const html = cheerio.load(body)
  const results = html('.gs_r.gs_or.gs_scl')
  if (!results.length)
    return reject(
      new Error(`
        Your Google Scholar query returned no results. Google may
        be rate-limiting your requests. You may try to visit 
        scholar.google.com and solve a captcha to unblock your IP or use a VPN.
      `)
    )

  const nextUrl =
    scholarUrl +
    html('.gs_ico_nav_next')
      .parent()
      .attr('href')
  const prevUrl =
    scholarUrl +
    html('.gs_ico_nav_previous')
      .parent()
      .attr('href')

  const resultsCountString = html('#gs_ab_md').text()
  const matches = resultCountRegex.exec(resultsCountString)
  const resultCount = parseInt(matches[1].replace(/,/g, ''))

  resolve({
    results: processResults(html, results),
    count: resultCount,
    nextUrl,
    prevUrl,
    next: () =>
      new Promise((resolve, reject) => {
        const requestOptions = {
          url: nextUrl,
          jar: true,
        }
        request(requestOptions, scholarResultsCallback(resolve, reject))
      }),
    previous: () =>
      new Promise((resolve, reject) => {
        const requestOptions = {
          url: prevUrl,
          jar: true,
        }
        request(requestOptions, scholarResultsCallback(resolve, reject))
      }),
  })
}

const search = query =>
  new Promise((resolve, reject) => {
    const requestOptions = {
      url: encodeURI(googleScholarUrl + query),
      jar: true, // remember cookies for future use
    }
    request(requestOptions, scholarResultsCallback(resolve, reject))
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
