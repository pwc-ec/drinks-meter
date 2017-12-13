import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, Grid, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

import Header from '../components/Header'
import Loader from '../components/Loader'
import RoundButton from '../components/RoundButton'

export interface IEventsProps {
  events: IEvent[]
  classes: any
  loading: boolean
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  root: {
    background: theme.bmai.palette.background,
    color: theme.bmai.palette.white,
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100%',
    overflow: 'hidden' as 'hidden',
  },
})

const Events: React.SFC<IEventsProps> = ({ events, classes, loading }) => (
  <div className={classes.root}>
    <Header text="Drinks Meter" />
    {loading ? (
      <Loader />
    ) : (
      <Grid
        className={classes.container}
        alignItems="center"
        direction="row"
        container={true}
        justify="center"
        spacing={40}
      >
        {events.map(ev => (
          <Grid className={classes.center} key={ev.id} item={true} xs={2}>
            <Link to={`/${ev.url}`}>
              <RoundButton title={ev.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
    )}
  </div>
)

export default withStyles(styles)(Events)
