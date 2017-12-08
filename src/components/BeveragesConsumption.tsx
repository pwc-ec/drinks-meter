import * as React from 'react'

import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import { getBeverageImage } from '../services/beverageImage'

export interface IBeveragesConsumptionProps {
  menuBeverages: IMenuBeverage[]
  classes: any
  loading: boolean
}

const styles = theme => ({
  root: {
    color: theme.bmai.palette.black,
    padding: theme.bmai.padding.size,
  },
})

const BeveragesConsumption: React.SFC<IBeveragesConsumptionProps> = ({ menuBeverages, classes, loading }) => (
  <div className={classes.root}>
    {loading ? (
      <Typography type="subheading">Loading...</Typography>
    ) : (
      <List dense={false}>
        {menuBeverages.map(mb => (
          <ListItem key={mb.id}>
            <img alt={mb.beverage.name} src={getBeverageImage(mb.beverage.name)} />
            <ListItemText primary={mb.beverage.name} />
          </ListItem>
        ))}
      </List>
    )}
  </div>
)

export default withStyles(styles)(BeveragesConsumption)
