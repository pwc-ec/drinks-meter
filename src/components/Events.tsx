import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import AppHeader from '../components/AppHeader'

export interface IEventsProps {
  events: IEvent[]
  classes: any
  loading: boolean
}

const styles = theme => ({
  root: {
    color: theme.bmai.palette.black,
    padding: theme.bmai.padding.size,
  },
})

const Events: React.SFC<IEventsProps> = ({ events, classes, loading }) => (
  <div className={classes.root}>
    <AppHeader fullname={null} />
    {loading ? (
      <Typography type="subheading">Loading...</Typography>
    ) : (
      <div>
        {events.map(ev => (
          <Button color="primary" key={ev.id}>
            <Link to={`/${ev.name}`}>{ev.name}</Link>
          </Button>
        ))}
      </div>
    )}
  </div>
)

export default withStyles(styles)(Events)
