const scholarUrl = 'https://scholar.google.com'

module.exports = processResults = (html, results) => {
  const processedResults = []
  results.each((i, el) => {
    const res = {} // will have title, url, authors, abstract, citedCount, citedUrl, relatedUrl, pdfUrl
    // filter out citations
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
      .trim()
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

    let authorHtml = html(el)
      .find('.gs_ri .gs_a')
      .html()
      .replace('<b>', '')
      .replace('</b>', '')

    if (authorHtml.includes('&#x2026;&#xFFFD;- ')) {
      authorHtml = authorHtml.split('&#x2026;&#xFFFD;- ')[0]
      res.etAl = true
    } else {
      authorHtml = authorHtml.split(' - ')[0]
      res.etAl = false
    }

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

    processedResults.push(res)
  })
  return processedResults
}
