import { css } from 'styled-components'

import theme from './theme'

const fontSizes = [13.5, 16, 18, 24, 27, 36, 48, 54, 72, 96]

export default css`
  font-size: 112.5%;
  line-height: 1.625;
  word-wrap: break-word;

  a {
    color: ${theme.blue.default};
  }

  // hides initial content
  div > div:first-of-type,
  h1:first-of-type,
  p:first-of-type,
  h3:first-of-type,
  p:nth-of-type(2) {
    display: none;
  }

  h1,
  h2 {
    padding-bottom: 0px;
    border-bottom: 1px solid ${theme.grey.light};
    font-weight: 900;
  }

  ${[...Array(5).keys()]
    .map(k => k + 1)
    .map(n => `h${n} { font-size: ${fontSizes[6 - n]}px; }`)
    .join('')}

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  ol,
  ul {
    padding-left: 27px;
  }

  blockquote {
    border-left: 4px solid ${theme.grey.light};
    color: ${theme.grey.dark};
    padding-left: 18px;
    margin-left: 0;
  }

  p,
  li {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  hr {
    border: 0;
    height: 4px;
    background-color: ${theme.indigo.default};
    max-width: 108px;
    margin: 24px auto;
    border-radius: 4px;
  }

  table {
    width: 100%;
    margin-top: 18px;
    margin-bottom: 18px;
    border-collapse: collapse;
    border: 1px solid ${theme.grey.light};
    th {
      font-weight: 700;
      text-align: left;
    }
    td,
    th {
      padding: 12px;
      border-right: 1px solid ${theme.grey.light};
      border-bottom: 1px solid ${theme.grey.light};
    }
    tbody {
      th {
        width: 25%;
      }
      th,
      td {
        border-bottom: 1px solid ${theme.grey.light};
      }
      tr:last-child {
        th,
        td {
          border-bottom: 1px solid ${theme.grey.light};
        }
      }
    }
  }

  pre,
  code,
  kbd {
    font-family: SFMono-Regular, 'Roboto Mono', Menlo, monospace;
    font-size: 100%;
    word-break: break-word;
  }

  pre,
  code {
    background-color: ${theme.grey.lighter};
    color: ${theme.grey.black};
  }

  a code {
    background-color: ${theme.blue.default};
    color: ${theme.grey.white};
    text-decoration: underline;
  }

  del code {
    text-decoration: inherit;
  }

  pre code {
    padding: 0;
  }

  code,
  kbd {
    border-radius: 3px;
    padding: 6px;
  }

  kbd {
    background-color: ${theme.grey.dark};
    color: ${theme.grey.white};
  }

  pre {
    border-radius: 4px;
    line-height: 1.375;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 18px;
    position: relative;
    word-wrap: normal;
  }

  // Custom syntax highlighting
  .namespace {
    opacity: 0.75;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.grey.default};
  }
  .token.punctuation {
    color: ${theme.grey.default};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${theme.red.default};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${theme.teal.default};
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${theme.purple.default};
  }
  .token.url {
    background: ${theme.blue.lightest};
    color: ${theme.indigo.default};
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${theme.blue.default};
  }
  .token.function {
    color: ${theme.pink.default};
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: ${theme.orange.default};
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.entity {
    cursor: help;
  }
  /* Line highlighting */
  pre[data-line] {
    position: relative;
  }
  pre[class*='language-'] > code[class*='language-'] {
    position: relative;
    z-index: 1;
  }
  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 12px;
    background: rgba(250, 247, 133, 0.8);
    pointer-events: none;
    white-space: pre;
  }
`
