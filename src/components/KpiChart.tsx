import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { Range } from 'rc-slider'
import * as React from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import colors from '../constants/colors'
import '../css/slider.css'
import { getKeysForLines } from '../services/chartUtils'
import { formatNumber, formatQuarter, formatQuarterLabel } from '../services/format'
import GraphActionBar from './GraphActionBar'

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  body: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.8rem',
    height: '100%',
    marginLeft: `calc(-${theme.bmai.padding.size} / 2)`,
    paddingTop: `calc(${theme.bmai.padding.size} / 4)`,
    position: 'relative' as 'relative',
  },
  chart: {
    marginLeft: `calc(-${theme.bmai.padding.size} / 2)`,
    width: `calc(100% + (${theme.bmai.padding.size} / 2))!Important`,
  },
  main: {
    height: '100%',
  },
  range: {
    '& .rc-slider-handle': {
      borderColor: theme.bmai.palette.primary,
    },
    '& .rc-slider-track': {
      backgroundColor: theme.bmai.palette.primary,
    },
    bottom: '3rem',
    height: '2rem',
    position: 'absolute' as 'absolute',
    right: '1rem',
    width: '30%',
  },
  title: {
    fontStyle: theme.bmai.text.titleStyle,
  },
})

// ------------------------------------------------------------------------------------------------

const tooltipStyles = theme => ({
  container: {
    background: theme.palette.common.darkWhite,
    border: `1px solid ${theme.bmai.buttonFloating.background}`,
    boxShadow: theme.shadows[5],
    color: theme.palette.text.secondary,
    padding: `calc(${theme.bmai.padding.size} / 2)`,
  },
  line: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
})

interface IKpiTooltipProps {
  relative: boolean
  label?: string
  payload?: any
}

const KpiTooltip = withStyles(tooltipStyles)<IKpiTooltipProps>(props => {
  const { label, payload, classes } = props
  const deltas = {}
  const strokes = (payload || []).map(({ stroke, name, value, unit }, index) => {
    const parts = name.replace(')', '').split('(')
    if (!deltas[parts[0]]) {
      deltas[parts[0]] = []
    }
    deltas[parts[0]].push({ companyName: parts[1], value, unit })

    return (
      <div key={'ttl_' + index} style={{ color: stroke }}>
        {name}: {formatNumber(props.relative)(value)} {unit}
      </div>
    )
  })

  const Deltas = Object.keys(deltas).reduce((sum, kpiName) => {
    const Delta = []
    const delta = deltas[kpiName].sort((a, b) => b.value - a.value)
    for (let i = 0; i < delta.length; i++) {
      for (let j = i + 1; j < delta.length; j++) {
        Delta.push(
          <div key={'ttd_' + i + '_' + j + '_' + delta[i].value + '_' + delta[j].value}>
            &Delta;
            {kpiName +
              ' (' +
              delta[i].companyName +
              '/' +
              delta[j].companyName +
              '): ' +
              formatNumber(props.relative)(delta[i].value - delta[j].value) +
              ' ' +
              delta[i].unit}
          </div>,
        )
      }
    }
    return sum.concat(Delta)
  }, [])

  return (
    <div className={classes.container}>
      <Typography type="subheading">{formatQuarterLabel(label)}</Typography>
      {strokes}
      <hr className={classes.line} />
      {Deltas}
    </div>
  )
})

// ------------------------------------------------------------------------------------------------

export interface IKpiChartProps {
  classes?: any
  kpiData?: IKpiData[]
  name?: string
  onDelete?: () => void
  onImageDownload?: () => void
  unitMap: any
  showPrintable: boolean
  relative: boolean
  onToggleRelative?: () => void
  xlsxDownloadUrl: string
  onRangeChange?: () => void
  minYear: number
  maxYear: number
  setMinYear: (min: number) => void
  setMaxYear: (max: number) => void
  setShowRange: (show: boolean) => void
  showRange: boolean
}

const KpiChart = ({
  classes,
  kpiData,
  unitMap,
  name,
  onDelete,
  onImageDownload,
  showPrintable,
  relative,
  onToggleRelative,
  xlsxDownloadUrl,
  onRangeChange,
  minYear,
  maxYear,
  setMinYear,
  setMaxYear,
  setShowRange,
  showRange,
}: IKpiChartProps) => {
  if (!unitMap) {
    return <div>Loading...</div>
  }

  if (relative) {
    kpiData = kpiData.map(dataInInterval => {
      const values = { ...dataInInterval }
      Object.keys(values).forEach(key => {
        if (key !== 'year' && key !== 'quarter') {
          if (values[key] > 0) {
            values[key] = Math.log(values[key])
          } else if (values[key] < 0) {
            values[key] = -Math.log(Math.abs(values[key]))
          }
        }
      })
      return values
    })
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
          isAnimationActive={!showPrintable}
        />
      )
    }
  })

  const { min, max } = kpiData.reduce(
    (sum, { quarter }) => {
      if (quarter > sum.max) {
        sum.max = quarter as number
      }
      if (quarter < sum.min) {
        sum.min = quarter as number
      }
      return sum
    },
    { min: Infinity, max: 0 },
  )

  if (minYear === null) {
    setMinYear(min)
  }

  if (maxYear === null) {
    setMaxYear(max)
  }

  const filtered = kpiData.filter(item => item.quarter >= minYear && item.quarter <= maxYear)

  const Axises = Array.from(new Set(Object.values(unitMap))).map((unit, index) => (
    <YAxis
      stroke="#c1c2c6"
      axisLine={false}
      tickFormatter={formatNumber(relative, true)}
      orientation={['left', 'right'][index]}
      yAxisId={'axis_' + unit}
      key={'axis_' + index}
      unit={' ' + unit}
    />
  ))

  let Printable = null
  if (showPrintable) {
    const PrintableAxises = Array.from(new Set(Object.values(unitMap))).map((unit, index) => (
      <YAxis
        tick={{ stroke: 'white', strokeWidth: 1, fontFamily: 'arial' }}
        axisLine={false}
        tickFormatter={formatNumber(relative, true)}
        orientation={['left', 'right'][index]}
        yAxisId={'axis_' + unit}
        key={'axis_' + index}
        unit={' ' + unit}
      />
    ))

    Printable = (
      <div
        style={{ width: 3120, height: 1800, padding: '0 40px', opacity: 0, position: 'absolute', top: 0, left: 0 }}
        id="print_graph"
      >
        <ComposedChart data={filtered} width={3120} height={1800}>
          <XAxis
            tick={{ stroke: 'white', strokeWidth: 1, fontFamily: 'arial' }}
            dataKey="quarter"
            orientation="bottom"
            xAxisId="quarter"
            tickFormatter={formatQuarter}
          />
          <XAxis
            tick={{ stroke: 'white', strokeWidth: 1, fontFamily: 'arial' }}
            dataKey="year"
            orientation="top"
            xAxisId="year"
          />
          {PrintableAxises}
          <CartesianGrid vertical={false} />
          <Legend verticalAlign="top" height={100} iconSize={32} style={{ color: 'red' }} />
          {lines}
        </ComposedChart>
      </div>
    )
  }

  let YearRange = null
  if (showRange) {
    YearRange = (
      <div className={classes.range}>
        <Range min={min} max={max} value={[minYear, maxYear]} onChange={onRangeChange} />
      </div>
    )
  }

  return (
    <div className={classes.main}>
      <Grid alignItems="center" container={true} justify="space-between" spacing={16} wrap="wrap">
        <Grid item={true} xs={true}>
          <Typography className={classes.title} type="display2">
            {name}
          </Typography>
        </Grid>
        <Grid item={true}>
          <GraphActionBar
            onDelete={onDelete}
            onImageDownload={onImageDownload}
            relative={relative}
            onToggleRelative={onToggleRelative}
            xlsxDownloadUrl={xlsxDownloadUrl}
          />
        </Grid>
      </Grid>
      <div className={classes.body} onMouseEnter={() => setShowRange(true)} onMouseLeave={() => setShowRange(false)}>
        <ResponsiveContainer className={classes.chart}>
          <ComposedChart data={filtered}>
            <XAxis
              stroke="#c1c2c6"
              xAxisId="quarter"
              dataKey="quarter"
              orientation="bottom"
              tickFormatter={formatQuarter}
            />
            <XAxis stroke="#c1c2c6" xAxisId="year" dataKey="year" orientation="top" />
            {Axises}
            <CartesianGrid stroke="#c1c2c6" vertical={false} />
            <Tooltip content={<KpiTooltip relative={relative} />} />
            {lines}
          </ComposedChart>
        </ResponsiveContainer>
        {YearRange}
        {Printable}
      </div>
    </div>
  )
}

export default withStyles(styles)(KpiChart)
