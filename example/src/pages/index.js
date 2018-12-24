import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <div
    style={{ maxWidth: `900px`, margin: `0 auto`, fontFamily: `sans-serif` }}
  >
    <h1>
      <a href="https://www.npmjs.com/package/gatsby-source-google-scholar">
        gatsby-source-google-scholar
      </a>
    </h1>
    {data.pubs.edges.map(({ node }) => (
      <div>
        <h3>
          <a href={node.url}>{node.title}</a>
        </h3>
        <p>{node.abstract}</p>
        <p>
          {node.authors.map(author => (
            <span style={{ marginRight: `1em` }}>
              {author.url ? (
                <a href={author.url}>{author.name}</a>
              ) : (
                author.name
              )}
            </span>
          ))}
          {node.pdfUrl && (
            <a href={node.pdfUrl} style={{ marginRight: `1em` }}>
              PDF
            </a>
          )}
          <a href={node.citedByUrl} style={{ marginRight: `1em` }}>
            Cited by {node.citedByCount}
          </a>
          <a href={node.relatedUrl} style={{ marginRight: `1em` }}>
            Related papers
          </a>
          {node.allVersionsUrl && (
            <a href={node.allVersionsUrl} style={{ marginRight: `1em` }}>
              All versions
            </a>
          )}
        </p>
      </div>
    ))}
  </div>
)

export default IndexPage

export const query = graphql`
  {
    pubs: allGoogleScholar {
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
`
