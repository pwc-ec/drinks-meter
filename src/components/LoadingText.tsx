import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  false: {
    paddingTop: theme.bmai.padding.size,
    textAlign: 'center',
  },
  true: {
    textAlign: 'center',
  },
})

const LoadingText = ({ classes, simple }) => (
  <Typography className={classes[simple]} type="title">
    Loading...
  </Typography>
)

export default withStyles(styles)(LoadingText)
