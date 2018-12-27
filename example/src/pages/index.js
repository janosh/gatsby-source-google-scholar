import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data: { plugin, pubs } }) => (
  <div
    style={{ maxWidth: `900px`, margin: `0 auto`, fontFamily: `sans-serif` }}
  >
    <h1>
      <a href="https://www.npmjs.com/package/gatsby-source-google-scholar">
        gatsby-source-google-scholar
      </a>
    </h1>
    <h2>Minimal Example Site</h2>
    <h3>Results for query "{plugin.ops.query}"</h3>
    {pubs.edges.map(({ node }) => (
      <div>
        <h3>
          <a href={node.url}>{node.title}</a>
        </h3>
        <p>{node.abstract}</p>
        <p>
          {node.preEtAl && <span>..., </span>}
          {node.authors.map((author, index) => (
            <span>
              {!!index && ', '}
              {author.url ? (
                <a href={author.url}>{author.name}</a>
              ) : (
                author.name
              )}
            </span>
          ))}
          {node.postEtAl && <span>, ...</span>}
        </p>
        <p>
          {node.pdfUrl && (
            <a href={node.pdfUrl} style={{ marginRight: `1em` }}>
              PDF
            </a>
          )}
          <span style={{ marginRight: `1em` }}>{node.year}</span>
          {node.journal && (
            <span style={{ marginRight: `1em` }}>{node.journal}</span>
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
    plugin: sitePlugin(name: { eq: "gatsby-source-google-scholar" }) {
      ops: pluginOptions {
        query
      }
    }
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
          preEtAl
          postEtAl
          abstract
          year
          journal
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
