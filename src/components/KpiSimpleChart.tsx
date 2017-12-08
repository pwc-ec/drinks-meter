import DeleteForeverIcon from 'material-ui-icons/DeleteForever'
import SwapHorizIcon from 'material-ui-icons/SwapHoriz'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import * as React from 'react'
import Draggable from 'react-draggable'
import colors from '../constants/colors'
import { getKeysForLines } from '../services/chartUtils'
import { formatNumber, formatQuarter } from '../services/format'
import { default as th } from '../services/theme'

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const styles = theme => ({
  body: {
    color: 'red',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.7rem',
    height: '200px',
    marginLeft: '-1rem',
    marginTop: '-1rem',
    paddingRight: '0.5rem',
  },
  button: {
    backgroundColor: theme.bmai.buttonFloating.contrastBackground,
    height: theme.bmai.buttonFloating.smallSize,
    marginLeft: `calc(${theme.bmai.buttonFloating.marginLeft} / 2)`,
    width: theme.bmai.buttonFloating.smallSize + 4,
  },
  buttonContainer: {
    display: 'none',
    overflow: 'hidden' as 'hidden',
    padding: '0.5rem',
    position: 'absolute' as 'absolute',
    right: `calc(${theme.bmai.padding.size} * 1.5)`,
    zIndex: theme.zIndex.menu,
  },
  chart: {
    '&:hover $buttonContainer': {
      display: 'inline-block',
    },
    '&:nth-child(n+2)': {
      paddingTop: `calc(${theme.bmai.padding.size} / 2)`,
    },
    cursor: 'pointer',
  },
  container: {
    height: '100%',
  },
  dragInner: {
    background: theme.bmai.palette.gradientBottomRight,
    zIndex: theme.zIndex.tooltip,
  },
  title: {
    color: theme.bmai.palette.contrastLight,
    padding: '1rem',
  },
})

class KpiSimpleChart extends React.Component<any, any> {
  public constructor(props) {
    super(props)
    this.state = { width: 0, position: { x: 0, y: 0 } }
  }

  public render() {
    const { kpiData, unitMap, count, name, classes, onDelete, onDrop } = this.props
    if (!unitMap) {
      return <div>Loading...</div>
    }

    const keysForLines = getKeysForLines(kpiData)

    const lines = keysForLines.map((companyName, index) => {
      if (companyName.includes('[year]')) {
        return (
          <Bar
            key={'kc' + index}
            dataKey={companyName}
            fill={colors[index + 1]}
            xAxisId={'year'}
            yAxisId={'axis_' + unitMap[companyName]}
            unit={unitMap[companyName]}
          />
        )
      } else {
        return (
          <Line
            yAxisId={'axis_' + unitMap[companyName]}
            xAxisId={companyName.includes('[year]') ? 'year' : 'quarter'}
            key={'kc' + index}
            type="monotone"
            dataKey={companyName}
            dot={false}
            strokeWidth={2}
            stroke={colors[index + 1]}
            activeDot={{ r: 4, fill: 'white', stroke: colors[index + 1] }}
            unit={unitMap[companyName]}
          />
        )
      }
    })

    const Axises = Array.from(new Set(Object.values(unitMap))).map((unit, index) => (
      <YAxis
        stroke="#c1c2c6"
        axisLine={false}
        tickLiner={false}
        orientation={['left', 'right'][index]}
        yAxisId={'axis_' + unit}
        key={'axis_' + index}
        unit={' ' + unit}
        tickFormatter={formatNumber(false, true)}
      />
    ))

    // TODO: Temporary fix for React.Children.only error in ComposedChart component, fix in better way
    const [a1, a2] = Axises
    const [g0, g1, g2, g3, g4, g5, g6, g7, g8, g9] = lines

    return (
      <div className={classes.chart}>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} fab={true} color="primary" aria-label="Make big graph" onClick={onDrop}>
            <SwapHorizIcon />
          </Button>
          <Button className={classes.button} fab={true} color="accent" aria-label="Delete graph" onClick={onDelete}>
            <DeleteForeverIcon />
          </Button>
        </div>
        <div className={classes.container}>
          <Draggable position={this.state.position} onStart={this.dragStart} onStop={this.dragStop}>
            <div className={classes.dragInner}>
              <Typography type="body2" className={classes.title}>
                {name}
              </Typography>
              <div className={classes.body}>
                <ResponsiveContainer>
                  <ComposedChart data={kpiData}>
                    <XAxis xAxisId="year" tickLine={false} dataKey="year" orientation="top" />
                    <XAxis
                      xAxisId="quarter"
                      dataKey="quarter"
                      orientation="bottom"
                      tickFormatter={formatQuarter}
                      tickLine={false}
                    />
                    {a1}
                    {a2}
                    <CartesianGrid stroke={th.bmai.simpleGraph.grid} vertical={false} />
                    {g0}
                    {g1}
                    {g2}
                    {g3}
                    {g4}
                    {g5}
                    {g6}
                    {g7}
                    {g8}
                    {g9}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }

  private dragStart = event => {
    event.stopPropagation()
    event.currentTarget.parentElement.style.border = `solid 1px ${th.bmai.simpleGraph.grid}`
    event.currentTarget.parentElement.style.backgroundColor = th.palette.common.white
    // this.setState({ width: 300 })
  }

  private dragStop = (event, { x, y }) => {
    const minimalMove = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * -0.25
    if (x > minimalMove) {
      this.setState({ position: { x: 0, y: 0 } })
    } else {
      this.setState({ position: { x, y } })
      this.props.onDrop(() => this.setState({ position: { x: 0, y: 0 } }))
    }
  }
}

export default withStyles(styles)(KpiSimpleChart)
