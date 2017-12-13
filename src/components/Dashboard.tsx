import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, Grid, IconButton, Typography } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import { withStyles } from 'material-ui/styles'

import Loader from '../components/Loader'
import DrinksThroughTime from '../containers/DrinksThroughTime'
import DrinksTotals from '../containers/DrinksTotals'

export interface IDashboardProps {
  currentEvent: IEvent
  classes: any
  loading: boolean
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  drinksThroughTime: {
    // height: '350px', // setting height via calc and percentage does not work
    width: 'calc(100% - 2rem)',
  },
  drinksTotals: {
    // height: '350px',
    width: 'calc(100% - 2rem)',
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

const Dashboard: React.SFC<IDashboardProps> = ({ currentEvent, classes, loading }) => (
  <div className={classes.root}>
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
        <Grid className={classes.center} item={true} xs={6}>
          <DrinksTotals
            classes={{ root: classes.drinksTotals }}
            loading={loading}
            menuBeverages={currentEvent && currentEvent.menuBeverages}
          />
          <DrinksThroughTime
            classes={{ root: classes.drinksThroughTime }}
            loading={loading}
            menuBeverages={currentEvent && currentEvent.menuBeverages}
          />
        </Grid>
        <Grid className={classes.center} item={true} xs={6}>
          <Link to={`/${currentEvent.url}`}>
            <IconButton className={classes.button} aria-label="Back">
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography type="subheading">{currentEvent.name}</Typography>
        </Grid>
      </Grid>
    )}
  </div>
)

export default withStyles(styles)(Dashboard)
