const scraper = require('./scraper')

const nodeInternalDescription = query => `
  Node created by gatsby-source-google-scholar. Contains scientific publication
  metadata scraped from Google Scholar results for query '${query}'
`

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  options
) => {
  if (!Array.isArray(options.queries))
    throw TypeError(
      `gatsby-source-google-scholar expects \`queries\` to be an array of strings.`
    )
  // helper function that processes a publication to match Gatsby's node structure
  const processPub = (pub, query) => ({
    ...pub,
    id: createNodeId(pub.url),
    parent: null,
    children: [],
    internal: {
      type: `GoogleScholar`,
      content: JSON.stringify(pub),
      contentDigest: createContentDigest(pub),
      description: nodeInternalDescription(query),
    },
  })

  await Promise.all(options.queries.map(query => scraper.search(query)))
    .then(responses =>
      responses.forEach((response, index) =>
        response.results.forEach(result =>
          createNode(processPub(result, options.queries[index]))
        )
      )
    )
    .catch(console.error)
}
