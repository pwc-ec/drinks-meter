import * as React from 'react'
import { Link } from 'react-router-dom'

import * as cn from 'classnames'

import { Button, Grid, IconButton, Typography } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import { withStyles } from 'material-ui/styles'

import Loader from '../components/Loader'
import PartyIndex from '../components/PartyIndex'
import DrinksThroughTime from '../containers/DrinksThroughTime'
import DrinksTotals from '../containers/DrinksTotals'

export interface IDashboardProps {
  currentEvent: IEvent
  classes: any
  loading: boolean
}

const styles = theme => ({
  borderBottom: {
    borderBottom: '0.05rem solid rgba(255,255,255,0.2)',
  },
  borderRight: {
    borderRight: '0.05rem solid rgba(255,255,255,0.2)',
  },
  button: {
    marginRight: '0.25rem',
  },
  cell: {
    padding: '1rem',
  },
  drinksThroughTime: {
    height: '40vh', // setting height via calc and percentage does not work
    width: '100%',
  },
  drinksTotals: {
    height: '40vh',
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  root: {
    background: theme.bmai.palette.background,
    color: theme.bmai.palette.white,
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100%',
    overflow: 'hidden' as 'hidden',
  },
  title: {
    fontWeight: 200 as 200,
  },
})

const Dashboard: React.SFC<IDashboardProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
    {loading ? (
      <Loader />
    ) : (
      <Grid
        className={classes.container}
        alignContent="stretch"
        alignItems="center"
        direction="row"
        container={true}
        justify="center"
        xs={true}
        spacing={0}
      >
        <Grid className={classes.fullHeight} item={true} xs={true}>
          <Grid className={classes.fullHeight} container={true} xs={true} spacing={0} direction="column">
            <Grid
              className={cn(classes.borderBottom, classes.borderRight, classes.cell)}
              item={true}
              xs={true}
              direction="column"
              justify="center"
            >
              <Grid className={classes.fullHeight} container={true} direction="row" xs={true} alignItems="center">
                <Grid item={true} xs={true}>
                  <DrinksTotals
                    classes={{ root: classes.drinksTotals }}
                    loading={loading}
                    menuBeverages={currentEvent && currentEvent.menuBeverages}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className={cn(classes.borderRight, classes.cell)} item={true} xs={true} alignContent="center">
              <Grid className={classes.fullHeight} container={true} direction="row" xs={true} alignItems="center">
                <Grid item={true} xs={true}>
                  <DrinksThroughTime
                    classes={{ root: classes.drinksThroughTime }}
                    loading={loading}
                    menuBeverages={currentEvent && currentEvent.menuBeverages}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.fullHeight} item={true} xs={true}>
          <Grid className={classes.fullHeight} container={true} xs={true} spacing={0} direction="column">
            <Grid className={cn(classes.borderBottom, classes.cell)} item={true} xs={true}>
              <Grid container={true} direction="row" alignItems="center">
                <Link to={`/${currentEvent.url}`} className={classes.button}>
                  <IconButton className={classes.button} aria-label="Back">
                    <MenuIcon />
                  </IconButton>
                </Link>
                <Typography type="title" className={classes.title}>
                  {currentEvent.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.cell} item={true} xs={true}>
              <Grid className={classes.fullHeight} container={true} spacing={0}>
                <Typography type="title" className={classes.title}>
                  Party Index
                </Typography>
                <Grid container={true} alignItems="flex-end" justify="flex-end" xs={true}>
                  <Grid item={true}>
                    <PartyIndex event={currentEvent} index={1} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )}
  </div>
)

export default withStyles(styles)(Dashboard)
