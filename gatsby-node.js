const scraper = require('./scraper')

exports.sourceNodes = (
  { actions: { createNode }, createNodeId, createContentDigest },
  configOptions
) => {
  // helper function that processes a publication to match Gatsby's node structure
  const processPub = pub => ({
    ...pub,
    id: createNodeId(pub.url),
    parent: null,
    children: [],
    internal: {
      type: `GoogleScholar`,
      content: JSON.stringify(pub),
      contentDigest: createContentDigest(pub),
    },
  })

  return scraper
    .search(configOptions.query)
    .then(response => {
      response.results.forEach(result => {
        createNode(processPub(result))
      })
    })
    .catch(error => console.error(error))
}
