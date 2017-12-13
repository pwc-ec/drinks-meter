import * as React from 'react'
import { Link } from 'react-router-dom'

import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import ReportMenu from '../containers/ReportMenu'
import UserMenu from '../containers/UserMenu'

const styles = theme => ({
  headline: {
    fontWeight: 200 as 200,
    marginLeft: '0.5rem',
  },
  root: {
    backgroundColor: theme.bmai.palette.background,
    boxShadow: 'none',
    color: theme.bmai.palette.contrast,
  },
  toolbar: {
    paddingLeft: theme.bmai.padding.size,
    paddingRight: theme.bmai.padding.size,
  },
})

const backBtn = (classes, back) => (
  <Link to={back}>
    <IconButton className={classes.button} aria-label="Back">
      <ArrowBackIcon />
    </IconButton>
  </Link>
)

const Header = props => {
  const { classes, text, back } = props
  return (
    <AppBar className={classes.root} position="static" color="inherit">
      <Toolbar className={classes.toolbar}>
        {back ? backBtn(classes, back) : null}
        <Typography className={classes.headline} type="headline">
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)<any>(Header)
