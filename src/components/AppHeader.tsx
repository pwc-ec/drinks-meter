import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import ReportMenu from '../containers/ReportMenu'
import UserMenu from '../containers/UserMenu'

const styles = theme => ({
  flex: {
    flex: 1,
  },
  reports: {
    flex: 1,
  },
  root: {
    backgroundColor: theme.palette.background.appBar,
    color: theme.bmai.palette.contrast,
    // width: '100%',
  },
})

const AppHeader = ({ classes }) => {
  return (
    <AppBar className={classes.root} position="static" color="inherit">
      <Toolbar>
        <Typography type="headline" className={classes.flex}>
          PwC - Drinks Meterß
        </Typography>
        {/* <div className={classes.reports}>
          <ReportMenu />
        </div>
        <UserMenu /> */}
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)<any>(AppHeader)
