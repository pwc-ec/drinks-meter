import * as React from 'react'
import { Link } from 'react-router-dom'

import * as cn from 'classnames'

import { Button, Grid, IconButton, Typography } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import { withStyles } from 'material-ui/styles'

import Loader from '../components/Loader'
import PieBar from '../components/PieBar'
import RoundCounter from '../components/RoundCounter'
import DrinksThroughTime from '../containers/DrinksThroughTime'
import DrinksTotals from '../containers/DrinksTotals'
import PartyIndex from '../containers/PartyIndex'

import { default as drinksTheme } from '../services/theme'

export interface IDashboardProps {
  averageAlcohol: number
  currentEvent: IEvent
  classes: any
  loading: boolean
  totalDrinks: number
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

const Dashboard: React.SFC<IDashboardProps> = ({ averageAlcohol, currentEvent, classes, loading, totalDrinks }) => (
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
              <Grid className={classes.fullHeight} container={true} direction="column" spacing={0} xs={true}>
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
                <Grid container={true} direction="row" justify="center" alignItems="center" xs={true}>
                  <Grid item={true} xs={3}>
                    <RoundCounter bigNumber={totalDrinks} title="Total Drinks" subtitle="Used on Event" />
                  </Grid>
                  <Grid item={true} xs={3}>
                    <RoundCounter
                      bigNumber={currentEvent.attendance}
                      title="People Counter"
                      subtitle="People on Event"
                    />
                  </Grid>
                  <Grid xs={3} item={true}>
                    <PieBar
                      colors={[drinksTheme.bmai.palette.contrast, drinksTheme.bmai.palette.darkGrey]}
                      data={averageAlcohol}
                      size={10}
                      subtitle="In Blood of Person"
                      title="Average alcohol"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.cell} item={true} xs={true}>
              <Grid className={classes.fullHeight} container={true} spacing={0}>
                <Typography type="title" className={classes.title}>
                  Party Index
                </Typography>
                <Grid container={true} alignItems="flex-end" justify="flex-end" xs={true}>
                  <Grid item={true}>
                    <PartyIndex event={currentEvent} />
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
