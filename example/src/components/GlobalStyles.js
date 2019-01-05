import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
   * {
    box-sizing: border-box;
    font-weight: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  html,
  body {
    min-height: 100%;
    min-width: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.5;
    height: 100%;
    max-height: 100%;
    width: 100%;
  }
  a {
    color: currentColor;
    text-decoration: none;
  }
`
