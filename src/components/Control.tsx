import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, Grid, List, ListItem, ListItemText, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

import Header from '../components/Header'
import Loader from '../components/Loader'
import RoundButton from '../components/RoundButton'

export interface IControlProps {
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

const Control: React.SFC<IControlProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    <Header text={currentEvent ? currentEvent.name : null} back={`/${currentEvent ? currentEvent.url : ''}`} />
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
        {currentEvent.menuBeverages.map(mb => (
          <Grid className={classes.center} key={mb.id} item={true} xs={2}>
            <RoundButton title={mb.beverage.name} subtitle={`${mb.beverage.volume} ${mb.beverage.unit}`} />
          </Grid>
        ))}
      </Grid>
    )}
  </div>
)

export default withStyles(styles)(Control)
