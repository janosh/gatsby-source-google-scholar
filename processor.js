const scholarUrl = 'https://scholar.google.com'

module.exports = processResults = (html, results) => {
  const processedResults = []
  results.each((i, el) => {
    // publication object: will receive title, url, authors (name, url?),
    //   preEtAl, postEtAl, abstract, year, journal?, citedByCount
    //   citedByUrl, relatedUrl, pdfUrl?
    const res = {}
    // filter out citations from results, want only actual publications
    if (
      html(el)
        .find('.gs_ri h3 span')
        .first()
        .text()
        .includes('CITATION')
    )
      return
    html(el)
      .find('.gs_ri h3 span')
      .remove()
    res.title = html(el)
      .find('.gs_ri h3')
      .text()
    res.url = html(el)
      .find('.gs_ri h3 a')
      .attr('href')
    res.abstract = html(el)
      .find('.gs_ri .gs_rs')
      .text()
      .replace('�', ' ')
      .replace('\n', '')
    res.pdfUrl = html(el)
      .find('a:contains("[PDF]")')
      .attr('href')
    res.citedByUrl =
      scholarUrl +
      html(el)
        .find('a:contains("Cited by")')
        .attr('href')
    res.citedByCount = parseInt(
      html(el)
        .find('a:contains("Cited by")')
        .text()
        .replace('Cited by ', '')
    )
    res.relatedUrl =
      scholarUrl +
      html(el)
        .find('a:contains("Related articles")')
        .attr('href')
    res.allVersionsUrl =
      scholarUrl +
      html(el)
        .find('a:contains("All "):contains(" versions")')
        .attr('href')

    const metaHtml = html(el)
      .find('.gs_ri .gs_a')
      .html()
      .replace(/<\/?b>/g, '')
    res.year = parseInt(metaHtml.match(/ (17|18|19|20)\d{2} /)[0])
    res.journal = metaHtml
      .replace(/.+- (.+?)?,? ?(?:17|18|19|20)\d{2} -.+/, '$1')
      .replace('&#xFFFD;&#x2026;', ' ...')
    res.preEtAl = metaHtml.startsWith('&#x2026;') ? true : false
    res.postEtAl = metaHtml.includes('&#x2026;&#xFFFD;- ') ? true : false
    // use regex negative lookahead to match everything up to the first " ?- " group
    const authorHtml = metaHtml.replace(
      /^(?:&#x2026;, )?((?:(?!(?:&#x2026;)?(?:&#xFFFD;)? ?- ).)+).*/,
      '$1'
    )
    res.authors = authorHtml.split(', ').map(str =>
      str.startsWith('<a href="')
        ? {
            name: str.substring(str.indexOf('">') + 2, str.indexOf('</a>')),
            url:
              scholarUrl +
              str.substring(str.indexOf('<a href="') + 9, str.indexOf('">')),
          }
        : { name: str, url: undefined }
    )
    Object.keys(res).forEach(key => {
      if (typeof res[key] === `string`) {
        res[key] = res[key].replace(/&.{4,6};/g, ``)
      }
    })

    processedResults.push(res)
  })
  return processedResults
}
