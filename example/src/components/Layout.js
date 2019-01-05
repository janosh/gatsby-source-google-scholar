import React, { Fragment } from 'react'

import GlobalStyles from './GlobalStyles'

export default props => (
  <Fragment>
    <GlobalStyles />
    {props.children}
  </Fragment>
)
