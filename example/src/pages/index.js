import React from 'react'
import { graphql } from 'gatsby'

import Global from '../styles/global'
import PageTitle, { NPM, GitHub, Gatsby } from '../styles/pageTitle'
import Grid from '../styles/grid'
import Docs from '../styles/docs'
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

const IndexPage = ({ data: { plugin, pubs, readme } }) => {
  let [about, docs] = readme.data.html.split(`<h2>Install</h2>`)
  about = about.replace(/<h3>.+Demo.+<\/h3>/, ``)
  docs = `<h1 id="docs">Docs</h1><h2>Install</h2>` + docs
  const queries = plugin.ops.queries
    .map(
      (query) =>
        `<a href="https://scholar.google.com/scholar?q=${query}">${query}</a>`
    )
    .join(`, `)
  return (
    <Global>
      <PageTitle>
        <div dangerouslySetInnerHTML={{ __html: about }} />
        <ul>
          <a href="https://github.com/janosh/gatsby-source-google-scholar">
            <GitHub />
          </a>
          <a href="https://www.npmjs.com/package/gatsby-source-google-scholar">
            <NPM />
          </a>
          <a href="https://www.gatsbyjs.org/packages/gatsby-source-google-scholar/">
            <Gatsby />
          </a>
        </ul>
        <ul>
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
        </ul>
        <h2>
          <a href="#docs">Docs</a>
        </h2>
        <h3
          dangerouslySetInnerHTML={{
            __html: `Displaying results for <code>queries=[${queries}]</code>`,
          }}
        />
      </PageTitle>
      <Grid>
        {pubs.nodes.map((pub) => (
          <Publication>
            <h3>
              <a href={pub.url}>{pub.title}</a>
            </h3>
            {pub.abstract}
            <div>
              <Authors count={pub.authors.length} />
              {pub.preEtAl && <span>..., </span>}
              {pub.authors.map((author, index) => (
                <span>
                  {index > 0 && ', '}
                  {author.url ? (
                    <a href={author.url}>{author.name}</a>
                  ) : (
                    author.name
                  )}
                </span>
              ))}
              {pub.postEtAl && <span>, ...</span>}
            </div>
            {pub.journal && (
              <span>
                <Journal />
                {pub.journal}
              </span>
            )}
            <MetaData>
              {pub.pdfUrl && (
                <a href={pub.pdfUrl}>
                  <PDF />
                  PDF
                </a>
              )}
              <span>
                <Year />
                {pub.year}
              </span>
              <a href={pub.citedByUrl}>
                <Citations />
                Cited by {pub.citedByCount}
              </a>
              <a href={pub.relatedUrl}>
                <Related />
                Related papers
              </a>
              {pub.allVersionsUrl && (
                <a href={pub.allVersionsUrl}>
                  <AllVersions />
                  All versions
                </a>
              )}
            </MetaData>
          </Publication>
        ))}
      </Grid>
      <Docs dangerouslySetInnerHTML={{ __html: docs }} />
    </Global>
  )
}

export default IndexPage

export const query = graphql`
  {
    plugin: sitePlugin(name: { eq: "gatsby-source-google-scholar" }) {
      ops: pluginOptions {
        queries
      }
    }
    pubs: allGoogleScholar {
      nodes {
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
    readme: file(name: { eq: "readme" }) {
      data: childMarkdownRemark {
        html
      }
    }
  }
`
