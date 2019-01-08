import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Prism from 'prismjs'

import theme from './theme'
import { name, title, description, img, url, org } from '../data.json'
import GlobalStyles from './GlobalStyles'

const meta = tags =>
  tags.map((props, index) =>
    React.createElement('meta', { ...props, key: index })
  )

export default class extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  componentDidUpdate() {
    Prism.highlightAll()
  }

  render() {
    return (
      <Fragment>
        <Helmet defaultTitle={title}>
          <html lang="en" />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content={theme.indigo.default} />

          {meta([
            { name: 'description', content: description },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@gatsbyjs' },
            { name: 'twitter:domain', content: url },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: img },
            { property: 'og:site_name', content: name },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: img },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: url }
          ])}
          <script type="application/ld+json" children={JSON.stringify(org)} />
        </Helmet>
        <GlobalStyles />
        {this.props.children}
      </Fragment>
    )
  }
}
