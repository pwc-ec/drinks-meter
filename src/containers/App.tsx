import { MuiThemeProvider } from 'material-ui/styles'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'

import * as routes from '../constants/routes'
import theme from '../services/theme'

import Snackbar from '../containers/Snackbar'

import BeveragesConsumption from '../containers/BeveragesConsumption'
import Control from '../containers/Control'
import Dashboard from '../containers/Dashboard'
import Event from '../containers/Event'
import Events from '../containers/Events'
import Home from '../containers/Home'

import '../css/joyride.css'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

const PropsRoute = ({ component, ...rest }) => {
  const render = routeProps => {
    return renderMergedProps(component, routeProps, rest)
  }

  return <Route {...rest} render={render} />
}

const App = props => (
  <MuiThemeProvider theme={theme}>
    <main>
      <Switch>
        <Route path="/" component={Events} exact={true} />
        <Route path="/:eventUrl" component={Event} exact={true} />
        <Route path="/:eventUrl/dashboard" component={Dashboard} />
        <Route path="/:eventUrl/control" component={Control} />
      </Switch>
    </main>
    <Snackbar />
  </MuiThemeProvider>
)

export default withRouter(App)
