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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../readme.md`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
  ],
}
