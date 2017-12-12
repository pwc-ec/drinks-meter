import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const colors = [
  '#e9bb0f',
  '#f16b40',
  '#d61e26',
  '#b71358',
  '#561a2e',
  '#671dd2',
  '#debaff',
  '#1c6dab',
  '#659f97',
  '#bed262',
  '#8dc50b',
  '#0b473a',
]

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
