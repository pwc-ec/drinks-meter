import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import AppHeader from '../components/AppHeader'

export interface IControlProps {
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

const Control: React.SFC<IControlProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    <AppHeader fullname={null} />
    {loading ? (
      <Typography type="subheading">Loading...</Typography>
    ) : (
      <div>
        <Typography type="subheading">Control</Typography>
        <Typography type="subheading">{currentEvent.name}</Typography>
      </div>
    )}
  </div>
)

export default withStyles(styles)(Control)
