import { MuiThemeProvider } from 'material-ui/styles'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'

import * as routes from '../constants/routes'
import theme from '../services/theme'

import AppHeader from '../components/AppHeader'
import BeveragesConsumption from '../containers/BeveragesConsumption'
import Snackbar from '../containers/Snackbar'

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
    <AppHeader fullname={null} />
    <main style={{ height: `calc(100% - ${theme.bmai.appHeader.height}px)` }}>
      <Switch>
        <Route path="/" component={BeveragesConsumption} />
      </Switch>
    </main>
    <Snackbar />
  </MuiThemeProvider>
)

export default withRouter(App)
