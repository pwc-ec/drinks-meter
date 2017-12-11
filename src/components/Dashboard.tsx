import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import AppHeader from '../components/AppHeader'

export interface IDashboardProps {
  currentEvent: IEvent
  classes: any
  loading: boolean
}

const styles = theme => ({
  root: {
    color: theme.bmai.palette.black,
    padding: theme.bmai.padding.size,
  },
})

const Dashboard: React.SFC<IDashboardProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    {loading ? (
      <Typography type="subheading">Loading...</Typography>
    ) : (
      <div>
        <Typography type="subheading">Dashboard</Typography>
        <Typography type="subheading">{currentEvent.name}</Typography>
      </div>
    )}
  </div>
)

export default withStyles(styles)(Dashboard)
