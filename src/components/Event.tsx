import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import AppHeader from '../components/AppHeader'

export interface IEventProps {
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

const Event: React.SFC<IEventProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    <AppHeader fullname={null} />
    {loading ? (
      <Typography type="subheading">Loading...</Typography>
    ) : (
      <div>
        <Typography type="subheading">{currentEvent.name}</Typography>
        <Button color="primary">
          <Link to={`/${currentEvent.url}/dashboard`}>Dashboard</Link>
        </Button>
        <Button color="primary">
          <Link to={`/${currentEvent.url}/control`}>Control</Link>
        </Button>
      </div>
    )}
  </div>
)

export default withStyles(styles)(Event)
