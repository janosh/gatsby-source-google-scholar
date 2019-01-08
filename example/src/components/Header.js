import React, { Fragment } from 'react'
import styled from 'styled-components'

import theme from './theme'
import markdownStyle from './markdownStyle'
import Icon from './Icon'

const LogoContainer = styled.div`
  margin: 2rem auto 0;
  width: 64px;
`

const Logo = styled.img`
  max-width: 100%;
`

const Title = styled.h1`
  font-weight: 900;
  text-align: center;
  color: ${theme.grey.black};
  margin: 0 0 0.5rem;
`

const Desc = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${theme.grey.dark};
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
  background-color: ${theme.indigo.default}30;
  color: ${theme.indigo.default};
  padding: 4px 8px;
  font-weight: 700;
  border-radius: 4px;

  &:hover {
    background-color: ${theme.indigo.dark}40;
  }
`

const CodeContainer = styled.div`
  padding: 0 2rem;
  display: none;

  @media (min-width: 32em) {
    display: block;
  }

  ${markdownStyle}

  pre {
    background-color: ${theme.grey.darker};
    color: ${theme.grey.white};
    border-radius: 8px;
    max-width: 48rem;
    margin: 2rem auto;
    font-family: ${theme.fonts.mono};
    font-size: 18px;
    padding: 24px;
    overflow-wrap: normal;
    word-break: break-word;
    overflow-x: auto;

    code {
      background-color: transparent;
      color: inherit;
    }
  }
`

const LearnMore = styled.div`
  max-width: 16rem;
  margin: 0 auto;
  text-align: center;
  color: ${theme.grey.default};
  cursor: pointer;

  &:hover {
    color: ${theme.grey.dark};
  }
`

const CTA = styled.p`
  margin: 0;
  color: inherit;
  font-size: 24px;
  font-weight: 700;
`

const snippet = `module.exports = {
  ...
    {
      resolve: \`gatsby-source-google-scholar\`,
      options: {
        queries: [\`richard feynman\`, \`albert einstein\`],
      },
    },
}
`

export default () => (
  <Fragment>
    <LogoContainer>
      <Logo src="/favicon.png" />
    </LogoContainer>
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
      <pre>
        <code>{snippet}</code>
      </pre>
    </CodeContainer>
    <a href="#docs">
      <LearnMore>
        <CTA>Learn more</CTA>
        <Icon glyph="down-caret" size={48} />
      </LearnMore>
    </a>
  </Fragment>
)
