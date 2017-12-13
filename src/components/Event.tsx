import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, Grid, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

import Header from '../components/Header'
import Loader from '../components/Loader'
import RoundButton from '../components/RoundButton'

export interface IEventProps {
  currentEvent: IEvent
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

const Event: React.SFC<IEventProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    <Header text={currentEvent ? currentEvent.name : null} back="/" />
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
        <Grid className={classes.center} item={true} xs={2}>
          <Link to={`/${currentEvent.url}/dashboard`}>
            <RoundButton title="Dashboard" />
          </Link>
        </Grid>
        <Grid className={classes.center} item={true} xs={2}>
          <Link to={`/${currentEvent.url}/control`}>
            <RoundButton title="Control" />
          </Link>
        </Grid>
      </Grid>
    )}
  </div>
)

export default withStyles(styles)(Event)
