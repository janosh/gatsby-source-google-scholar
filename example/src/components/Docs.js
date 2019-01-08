import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import docs from 'raw-loader!../../../readme.md'
import theme from './theme'
import markdownStyle from './markdownStyle'

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;

  ${markdownStyle}
`
const Sheet = styled.div`
  box-shadow: ${theme.shadows.default};
  padding: 2rem;
  color: ${theme.grey.black};
`

export default () => (
  <Container id="docs">
    <Sheet>
      <ReactMarkdown source={docs} escapeHtml={false} />
    </Sheet>
  </Container>
)
