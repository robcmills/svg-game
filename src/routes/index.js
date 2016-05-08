import React from 'react'
import { Route, IndexRedirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HexView from 'views/HexView/HexView'
import RulesView from 'views/RulesView/RulesView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='/hex' />
    <Route path='hex' component={HexView} />
    <Route path='rules' component={RulesView} />
  </Route>
)
