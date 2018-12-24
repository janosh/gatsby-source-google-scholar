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
        query: `albert einstein`,
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
            "id": "3e2dc5b6-bab2-5b3f-a9be-a9c17c9a8b28",
            "title": "Can quantum-mechanical description of physical reality be considered complete?",
            "url": "https://journals.aps.org/pr/abstract/10.1103/PhysRev.47.777",
            "authors": [
              {
                "name": "A Einstein",
                "url": "https://scholar.google.com/citations?user=qc6CJjYAAAAJ&amp;hl=en&amp;oe=ASCII&amp;oi=sra"
              },
              {
                "name": "B Podolsky",
                "url": null
              },
              {
                "name": "N Rosen",
                "url": null
              }
            ],
            "abstract": "In a complete theory there is an element corresponding to each element of reality. A sufficient condition for the reality of a physical quantity is the possibility of predicting it with certainty, without disturbing the system. In quantum mechanics in the case of two physical …",
            "etAl": false,
            "pdfUrl": "https://link.aps.org/pdf/10.1103/PhysRev.47.777",
            "citedByCount": 17372,
            "citedByUrl": "https://scholar.google.com/scholar?cites=8174092782678430881&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII",
            "relatedUrl": "https://scholar.google.com/scholar?q=related:odSh4BM2cHEJ:scholar.google.com/&scioq=albert+einstein&hl=en&oe=ASCII&as_sdt=0,5",
            "allVersionsUrl": "https://scholar.google.com/scholar?cluster=8174092782678430881&hl=en&oe=ASCII&as_sdt=0,5"
          }
        },
        {
          "node": {
            "id": "aa808287-928e-5af5-a4de-7a03705aed7a",
            "title": "Investigations on the Theory of the Brownian Movement",
            "url": "https://books.google.com/books?hl=en&lr=&id=X5iRDQAAQBAJ&oi=fnd&pg=PA139&dq=albert+einstein&ots=-VS4mb3Dyk&sig=ac6ZFTP07oWfaGfPmCa2UMxJQYY",
            "authors": [
              {
                "name": "A Einstein",
                "url": "https://scholar.google.com/citations?user=qc6CJjYAAAAJ&amp;hl=en&amp;oe=ASCII&amp;oi=sra"
              }
            ],
            "abstract": "The \"Brownian movement\" was first described in 1828 by the botanist Robert Brown. While investigating the pollen of several different plants, he observed that pollen dispersed in water in a great number of small particles which he perceived to be in uninterrupted and …",
            "etAl": false,
            "pdfUrl": "https://www.hispacultur.org/book/516512150/download-investigations-on-the-theory-of-the-brownian-movement-albert-einstein.pdf",
            "citedByCount": 4334,
            "citedByUrl": "https://scholar.google.com/scholar?cites=13746912682491308133&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII",
            "relatedUrl": "https://scholar.google.com/scholar?q=related:Zeg0HkDYxr4J:scholar.google.com/&scioq=albert+einstein&hl=en&oe=ASCII&as_sdt=0,5",
            "allVersionsUrl": "https://scholar.google.com/scholar?cluster=13746912682491308133&hl=en&oe=ASCII&as_sdt=0,5"
          }
        },
        {
          "node": {
            "id": "bb05afeb-232f-5622-9217-78b614812cee",
            "title": "Relativity",
            "url": "https://www.taylorfrancis.com/books/9781134596775",
            "authors": [
              {
                "name": "A Einstein",
                "url": "https://scholar.google.com/citations?user=qc6CJjYAAAAJ&amp;hl=en&amp;oe=ASCII&amp;oi=sra"
              }
            ],
            "abstract": "The present book is intended, as far as possible, to give an exact insight into the theory of Relativity to those readers who, from a general scientific and philosophical point of view, are interested in the theory, but who are not conversant with the mathematical apparatus of …",
            "etAl": false,
            "pdfUrl": "http://www.gutenberg.lib.md.us/3/6/1/1/36114/36114-pdf.pdf",
            "citedByCount": 3079,
            "citedByUrl": "https://scholar.google.com/scholar?cites=7776319038733823699&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII",
            "relatedUrl": "https://scholar.google.com/scholar?q=related:0y7WC_cI62sJ:scholar.google.com/&scioq=albert+einstein&hl=en&oe=ASCII&as_sdt=0,5",
            "allVersionsUrl": "https://scholar.google.com/scholar?cluster=7776319038733823699&hl=en&oe=ASCII&as_sdt=0,5"
          }
        }
      ]
    }
  }
}
```
