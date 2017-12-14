import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import * as moment from 'moment'
import { CartesianGrid, Cell, ComposedChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from '../constants/colors'

export interface IDrinksThroughTimeProps {
  classes?: any
  data?: any
  eventId: string
}

const styles = theme => ({
  root: {
    height: '350px',
    width: '400px',
  },
})

const DrinksThroughTime: React.SFC<IDrinksThroughTimeProps> = ({ classes, data }) => {
  const uniqValueNames = {}
  if (data && data.length) {
    data.forEach(entry => {
      Object.keys(entry).forEach(key => {
        if (key !== 'time') {
          uniqValueNames[key] = 1
        }
      })
    })
  }
  const valueNames = Object.keys(uniqValueNames)
  console.log(uniqValueNames, valueNames)
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          {data
            ? valueNames.map((vn, index) => (
                <Line
                  key={'line-' + index}
                  dataKey={vn}
                  fill={colors[index]}
                  stroke={colors[index]}
                  strokeWidth={3}
                  type="monotone"
                />
              ))
            : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default withStyles(styles)(DrinksThroughTime)
