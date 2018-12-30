import React from 'react'
import { graphql } from 'gatsby'

import Global from '../styles/global'
import PageTitle, { NPM, GitHub, Gatsby } from '../styles/pageTitle'
import Grid from '../styles/grid'
import Publication, {
  Authors,
  MetaData,
  PDF,
  Year,
  Citations,
  Related,
  AllVersions,
  Journal,
} from '../styles/publication'

const IndexPage = ({ data: { plugin, pubs } }) => (
  <Global>
    <PageTitle>
      <h1>
        <a href="https://www.npmjs.com/package/gatsby-source-google-scholar">
          gatsby-source-google-scholar
        </a>
      </h1>
      <h2>Minimal Example Site</h2>
      <h3>
        Results for querying{' '}
        {plugin.ops.queries.map((query, index) => (
          <>
            {!!index && `, `}
            <a href={`https://scholar.google.com/scholar?q=${query}`}>
              {query}
            </a>
          </>
        ))}
      </h3>
      <p>
        <a href="https://github.com/janosh/gatsby-source-google-scholar">
          <GitHub />
        </a>
        <a href="https://www.npmjs.com/package/gatsby-source-google-scholar">
          <NPM />
        </a>
        <a href="https://www.gatsbyjs.org/packages/gatsby-source-google-scholar/">
          <Gatsby />
        </a>
      </p>
      <p>
        <img
          alt="NPM downloads"
          src="https://img.shields.io/npm/dm/gatsby-source-google-scholar.svg?logo=npm"
        />
        <img
          alt="NPM version"
          src="https://img.shields.io/npm/v/gatsby-source-google-scholar.svg"
        />
        <img
          alt="Last commit"
          src="https://img.shields.io/github/last-commit/janosh/gatsby-source-google-scholar.svg"
        />
      </p>
    </PageTitle>
    <Grid>
      {pubs.edges.map(({ node }) => (
        <Publication>
          <h3>
            <a href={node.url}>{node.title}</a>
          </h3>
          <p>{node.abstract}</p>
          <p>
            <Authors count={node.authors.length} />
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
          <MetaData>
            {node.pdfUrl && (
              <a href={node.pdfUrl}>
                <PDF />
                PDF
              </a>
            )}

            <span>
              <Year />
              {node.year}
            </span>
            {node.journal && (
              <span>
                <Journal />
                {node.journal}
              </span>
            )}
            <a href={node.citedByUrl}>
              <Citations />
              Cited by {node.citedByCount}
            </a>
            <a href={node.relatedUrl}>
              <Related />
              Related papers
            </a>
            {node.allVersionsUrl && (
              <a href={node.allVersionsUrl}>
                <AllVersions />
                All versions
              </a>
            )}
          </MetaData>
        </Publication>
      ))}
    </Grid>
  </Global>
)

export default IndexPage

export const query = graphql`
  {
    plugin: sitePlugin(name: { eq: "gatsby-source-google-scholar" }) {
      ops: pluginOptions {
        queries
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
