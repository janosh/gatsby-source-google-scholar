# gatsby-source-google-scholar

Gatsby source plugin for pulling metadata of scientific publications from Google Scholar.

## Install

```sh
yarn add gatsby-source-google-scholar
```

## Usage

Include the plugin in your `gatsby-config` and specify your query.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    ...
  },
  plugins: [
    {
      resolve: `gatsby-source-google-scholar`,
      options: {
        query: `quantum field theory`,
      },
    },
  ],
}
```

Grab relevant metadata with a GraphQL query.

```graphql
{
  allGoogleScholar {
    edges {
      node {
        id
        title
        url
        authors {
          name
          url
        }
        abstract
        pdfUrl
        citedCount
        citedUrl
        relatedUrl
      }
    }
  }
}
```
