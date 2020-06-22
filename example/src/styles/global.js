import React from 'react'

import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from './theme'
import Prism from './prism'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 4em;
    font-family: sans-serif;
    max-width: 1300px;
    background: ${(props) => props.theme.lighterGray};
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.darkBlue};
  }
`

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Prism />
      {children}
    </>
  </ThemeProvider>
)
