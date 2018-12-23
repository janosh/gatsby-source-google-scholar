# [gatsby-source-google-scholar](https://www.gatsbyjs.org/packages/gatsby-source-google-scholar)

[Gatsby](https://www.gatsbyjs.org) source plugin that pulls metadata for scientific publications from [Google Scholar](https://scholar.google.com).

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
        etAl
        abstract
        pdfUrl
        citedByCount
        citedByUrl
        relatedUrl
        allVersionsUrl
      }
    }
  }
}
```

This is what you get.

```json
{
  "data": {
    "allGoogleScholar": {
      "edges": [
        {
          "node": {
            "id": "8f99ba6b-42db-5d02-aa46-986b907730d3",
            "title": "Quantum field theory and critical phenomena",
            "url": "http://cds.cern.ch/record/2280881",
            "authors": [
              {
                "name": "J Zinn-Justin",
                "url": "https://scholar.google.com/citations?user=lpTL7HwAAAAJ&amp;hl=en&amp;oe=ASCII&amp;oi=sra"
              }
            ],
            "abstract": "Over the last twenty years quantum field theory has become not only the framework for the discussion of all fundamental interactions except gravity, but also for the understanding of second-order phase transitions in statistical mechanics. This advanced text is based on …",
            "etAl": false,
            "pdfUrl": null,
            "citedByCount": 5147,
            "citedByUrl": "https://scholar.google.com/scholar?cites=6453279145216378381&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII",
            "relatedUrl": "https://scholar.google.com/scholar?q=related:DQYPDzGnjlkJ:scholar.google.com/&scioq=quantum+field+theory&hl=en&oe=ASCII&as_sdt=0,5",
            "allVersionsUrl": "https://scholar.google.com/scholar?cluster=6453279145216378381&hl=en&oe=ASCII&as_sdt=0,5"
          }
        },
        {
          "node": {
            "id": "dda51f76-4654-543c-8b3d-cbc63aca0c33",
            "title": "An introduction to quantum field theory",
            "url": "https://www.taylorfrancis.com/books/9780429972102",
            "authors": [
              {
                "name": "ME Peskin",
                "url": "https://scholar.google.com/citations?user=Tu8OVXoAAAAJ&amp;hl=en&amp;oe=ASCII&amp;oi=sra"
              }
            ],
            "abstract": "Quantum field theory is a set of ideas and tools that combines three of the major themes of modern physics: the quantum theory, the field concept, and the principle of relativity. Today, most working physicists need to know some quantum field theory, and many others are …",
            "etAl": false,
            "pdfUrl": "https://cds.cern.ch/record/257493/files/9780201503975_TOC.pdf",
            "citedByCount": 8489,
            "citedByUrl": "https://scholar.google.com/scholar?cites=16874761593160792884&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII",
            "relatedUrl": "https://scholar.google.com/scholar?q=related:NPvAPUMyL-oJ:scholar.google.com/&scioq=quantum+field+theory&hl=en&oe=ASCII&as_sdt=0,5",
            "allVersionsUrl": "https://scholar.google.com/scholar?cluster=16874761593160792884&hl=en&oe=ASCII&as_sdt=0,5"
          }
        }
      ]
    }
  }
}
```
