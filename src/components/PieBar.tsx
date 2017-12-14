import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'
import Typography from 'material-ui/Typography'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { default as defaultColors } from '../constants/colors'

export interface IPieBarProps {
  classes?: any
  colors?: string[]
  data: any
  height: number
  size: number
  subtitle?: string
  text?: string
  title?: string
  width: number
}

const styles = theme => ({
  content: {
    marginBottom: '2rem',
    position: 'absolute' as 'absolute',
  },
  label: {
    fill: '#fff',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '4rem',
    fontWeight: 500 as 500,
  },
  root: {
    height: '100%',
    textAlign: 'center',
    width: '100%',
  },
  spacer: {
    // paddingBottom: '100%',
    width: '100%',
  },
  subtitle: {
    marginBottom: '-0.8rem',
    paddingTop: '0.5rem',
    textTransform: 'uppercase',
  },
  title: {
    color: fade('#fff', 0.8),
    fontSize: '1.2rem',
    margin: '0 0 auto',
    textTransform: 'uppercase',
  },
})

const PieBar: React.SFC<IPieBarProps> = ({
  classes,
  colors = defaultColors,
  data,
  height = 200,
  size = 10,
  subtitle = '',
  text = '',
  title = '',
  width = 200,
}) => (
  <div className={classes.root}>
    <ResponsiveContainer>
      <PieChart className={classes.content}>
        <Pie data={data} innerRadius="80%" outerRadius="100%" paddingAngle={0}>
          {/* {data.map((entry, index) => (
            <Cell key={'pbc-' + index} fill={colors[index % colors.length]} strokeWidth={0} />
          ))}
          <Label className={classes.label} position="center" value={text || (data && data[0] && data[0].value)} /> */}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <div className={classes.spacer} />
    <Typography className={classes.title} type="headline">
      {title}
    </Typography>
    <Typography className={classes.subtitle} type="subheading">
      {subtitle}
    </Typography>
  </div>
)

export default withStyles(styles)(PieBar)
