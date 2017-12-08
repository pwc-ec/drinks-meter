import * as React from 'react'

import { LinearProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

const styles = theme => {
  const { bmai: { progress } } = theme
  return { progress }
}

const Progress = ({ classes, ...props }) => {
  console.debug('progress', props)

  return <LinearProgress className={classes.progress} color="accent" {...props} />
}

export default withStyles(styles)<any>(Progress)
