const scraper = require('./scraper')
const uuid = require('uuid/v4')

exports.sourceNodes = (
  { actions: { createNode }, createNodeId, createContentDigest },
  configOptions
) => {
  // helper function that processes a publication to match Gatsby's node structure
  const processPub = pub => ({
    ...pub,
    id: pub.url ? createNodeId(pub.url) : uuid(),
    parent: null,
    children: [],
    internal: {
      type: `GoogleScholar`,
      content: JSON.stringify(pub),
      contentDigest: createContentDigest(pub),
    },
  })

  return scraper.search(configOptions.query).then(res => {
    res.results.forEach(result => {
      createNode(processPub(result))
    })
  })
}
