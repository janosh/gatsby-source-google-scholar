module.exports = {
  siteMetadata: {
    title: `gatsby-source-google-scholar-example`,
    description: `gatsby-source-google-scholar kitchen sink`,
    author: `Janosh Riebesell`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      // locally importing gatsby-source-google-scholar
      resolve: require.resolve(`..`),
      options: {
        queries: [`richard feynman`, `albert einstein`]
      }
    }
  ]
}
