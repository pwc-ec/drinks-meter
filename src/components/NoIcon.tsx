import * as React from 'react'

import { withStyles } from 'material-ui/styles'

const styles = theme => {
  const { bmai: { list } } = theme
  return list
}

const NoIcon = props => {
  const { classes, className } = props
  return <span className={`${className || ''} ${classes.noIcon}`}>&nbsp;</span>
}

export default withStyles(styles)(NoIcon)
