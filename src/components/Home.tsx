import * as React from 'react'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

export interface IHomeProps {
  classes: any
}

const styles = theme => ({
  root: {
    color: theme.bmai.palette.black,
    padding: theme.bmai.padding.size,
  },
})

const Home: React.SFC<IHomeProps> = ({ classes }) => (
  <div className={classes.root}>
    <Button color="primary">Dashboard</Button>
    <Button color="primary">Control</Button>
  </div>
)

export default withStyles(styles)(Home)
