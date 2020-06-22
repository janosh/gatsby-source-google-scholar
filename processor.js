// shape of publication object `res` (question marks indicate data that may be missing):
// {
//   title,
//   url,
//   authors: {
//     name,
//     url?,
//   },
//   preEtAl,
//   postEtAl,
//   abstract,
//   year,
//   journal?,
//   citedByCount,
//   citedByUrl,
//   relatedUrl,
//   pdfUrl?,
// }

const scholarUrl = 'https://scholar.google.com'

module.exports = processResults = (html, results) => {
  const processedPubs = []

  results.each((i, el) => {
    const pub = {}
    // filter out citations from results, we only care about actual publications
    if (html(el).find('.gs_ri h3 span').first().text().includes('CITATION'))
      return
    html(el).find('.gs_ri h3 span').remove()

    pub.title = html(el).find('.gs_ri h3').text()

    pub.url = html(el).find('.gs_ri h3 a').attr('href')

    pub.abstract = html(el)
      .find('.gs_ri .gs_rs')
      .text()
      .replace('�', ' ')
      .replace('\n', '')

    pub.pdfUrl = html(el).find('a:contains("[PDF]")').attr('href')

    pub.citedByUrl =
      scholarUrl + html(el).find('a:contains("Cited by")').attr('href')

    pub.citedByCount = parseInt(
      html(el).find('a:contains("Cited by")').text().replace('Cited by ', '')
    )

    pub.relatedUrl =
      scholarUrl + html(el).find('a:contains("Related articles")').attr('href')

    pub.allVersionsUrl =
      scholarUrl +
      html(el).find('a:contains("All "):contains(" versions")').attr('href')

    const metaHtml = html(el)
      .find('.gs_ri .gs_a')
      .html()
      .replace(/<\/?b>/g, '')

    pub.year = parseInt(metaHtml.match(/ (17|18|19|20)\d{2} /)[0])

    pub.journal = metaHtml
      .replace(/.+- (.+?)?,? ?(?:17|18|19|20)\d{2} -.+/, '$1')
      .replace('&#xFFFD;&#x2026;', ' ...')

    pub.preEtAl = metaHtml.startsWith('&#x2026;') ? true : false

    pub.postEtAl = metaHtml.includes('&#x2026;&#xFFFD;- ') ? true : false

    // use regex negative lookahead to match everything up to the first " ?- " group
    const authorHtml = metaHtml.replace(
      /^(?:&#x2026;, )?((?:(?!(?:&#x2026;)?(?:&#xFFFD;)? ?- ).)+).*/,
      '$1'
    )

    pub.authors = authorHtml.split(', ').map((str) =>
      str.startsWith('<a href="')
        ? {
            name: str.substring(str.indexOf('">') + 2, str.indexOf('</a>')),
            url:
              scholarUrl +
              str.substring(str.indexOf('<a href="') + 9, str.indexOf('">')),
          }
        : { name: str, url: undefined }
    )

    Object.keys(pub).forEach((key) => {
      if (typeof pub[key] === `string`) {
        pub[key] = pub[key].replace(/&.{4,6};/g, ``)
      }
    })

    processedPubs.push(pub)
  })

  return processedPubs
}
