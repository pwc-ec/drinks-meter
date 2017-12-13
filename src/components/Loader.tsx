import * as React from 'react'

import { CircularProgress, Grid, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'

const styles = theme => ({
  center: {
    textAlign: 'center',
  },
  progress: {
    color: theme.bmai.palette.accent,
    paddingBottom: theme.bmai.padding.size,
  },
  root: {
    height: '100%',
  },
  text: {
    color: fade('#fff', 0.3),
    fontWeight: 200 as 200,
  },
})

const Loader = props => {
  const { classes } = props
  return (
    <Grid className={classes.root} alignItems="center" direction="row" container={true} justify="center">
      <Grid className={classes.center} item={true}>
        <CircularProgress className={classes.progress} color="accent" size={64} />
        <Typography className={classes.text} type="subheading">
          Loading...
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Loader)
