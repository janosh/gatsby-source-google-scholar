import React, { Fragment } from 'react'
import styled from 'styled-components'
import Highlight from 'react-highlight.js'

const Title = styled.h1`
  font-weight: 900;
  text-align: center;
  color: #0c1e29;
  margin: 2rem 0 0.5rem;
`

const Desc = styled.p`
  font-family: Menlo, monospace;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #4e616c;
  max-width: 32rem;
  margin: 0 auto;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

const Link = styled.a`
  margin: 0 1rem;
  background-color: #5978f330;
  color: #5978f3;
  padding: 4px 8px;
  font-weight: 700;
  border-radius: 4px;

  &:hover {
    background-color: #405dcf40;
  }
`

const CodeContainer = styled.div`
  padding: 0 2rem;
  display: none;

  @media (min-width: 32em) {
    display: block;
  }
`

const Pre = styled.pre`
  background-color: #011627;
  color: #fff;
  border-radius: 8px;
  max-width: 48rem;
  margin: 2rem auto;
  font-family: SFMono-Regular, 'Roboto Mono', Menlo, monospace;
  font-size: 18px;
  padding: 24px;
  overflow-wrap: normal;
  word-break: break-word;
  overflow-x: auto;
`

const Code = styled.code`
  .hljs-comment {
    color: #ccc;
  }

  .hljs-built_in {
    color: #c792ea;
  }

  .hljs-string {
    color: #addb67;
  }
`

const snippet = `{
  // locally importing gatsby-source-google-scholar
  resolve: require.resolve(\`..\`),
  options: {
    queries: [\`richard feynman\`, \`albert einstein\`],
  },
}
`

export default () => (
  <Fragment>
    <Title>gatsby-source-google-scholar</Title>
    <Desc>
      Gatsby source plugin for pulling metadata of scientific publications from
      Google Scholar.
    </Desc>
    <FlexRow>
      <Link href="https://github.com/janosh/gatsby-source-google-scholar">
        Github
      </Link>
      <Link href="https://www.npmjs.com/package/gatsby-source-google-scholar">
        NPM
      </Link>
    </FlexRow>
    <CodeContainer>
      <Highlight language="javascript" innerHtml={true}>
        <Pre>
          <Code>{snippet}</Code>
        </Pre>
      </Highlight>
    </CodeContainer>
  </Fragment>
)
