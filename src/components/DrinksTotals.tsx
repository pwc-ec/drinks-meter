import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from '../constants/colors'

export interface IDrinksTotalsProps {
  classes?: any
  data?: any
  eventId: string
}

const styles = theme => ({
  root: {
    height: '350px',
    padding: '1rem',
    width: '400px',
  },
})

const DrinksTotals: React.SFC<IDrinksTotalsProps> = ({ classes, data }) => (
  <div className={classes.root}>
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="count" fill="#82ca9d" barSize={30}>
          {data ? data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />) : null}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export default withStyles(styles)(DrinksTotals)
