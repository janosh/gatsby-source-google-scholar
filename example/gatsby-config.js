module.exports = {
  siteMetadata: {
    title: `gatsby-source-google-scholar-example`,
    description: `gatsby-source-google-scholar kitchen sink`,
    author: `Janosh Riebesell`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      // locally importing gatsby-source-google-scholar
      resolve: require.resolve(`..`),
      options: {
        queries: [`richard feynman`, `albert einstein`],
      },
    },
  ],
}
