import * as React from 'react'

import AddIcon from 'material-ui-icons/Add'
import ClearIcon from 'material-ui-icons/Clear'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

import ButtonWithTooltip from './ButtonWithTooltip'

// ------------------------------------------------------------------------------------------------
const KpiList = ({ classes, isAddDisabled, kpis, onAdd, onRemove }) => (
  <Grid
    alignContent="space-between"
    alignItems="center"
    className={classes.list}
    container={true}
    direction="row"
    justify="flex-end"
    spacing={8}
    wrap="wrap"
  >
    {(kpis || []).map(kpi => (
      <Grid key={'kpi' + kpi.id} className={classes.item} item={true} xs={true}>
        <Chip
          className={classes.chip}
          deleteIcon={<ClearIcon style={{ height: 16, width: 16, paddingLeft: 8, paddingRight: 8 }} />}
          label={kpi.name}
          onRequestDelete={() => onRemove(kpi)}
        />
      </Grid>
    ))}
    <Grid item={true}>
      <ButtonWithTooltip
        ariaLabel="add kpi"
        classes={{ button: classes.add }}
        disabled={isAddDisabled}
        fab={false}
        onClick={onAdd}
        tooltip="Click to add another KPI into big graph"
        tooltipPlacement="top"
      >
        Add KPI
        <AddIcon />
      </ButtonWithTooltip>
    </Grid>
  </Grid>
)
// ------------------------------------------------------------------------------------------------

export interface IGraphKpiListProps {
  classes?: any
  className?: any
  graph?: IGraph
  onAdd?: () => void
  onRemove?: (kpi: IKpi) => void
}

const styles = theme => ({
  add: {
    '& > span': {
      whiteSpace: 'nowrap',
    },
    '& > span > svg': {
      height: '19px',
      width: '19px',
    },
    '&:hover, &:focus': {
      backgroundColor: theme.bmai.buttonFloating.hoverBackground,
      color: theme.bmai.buttonFloating.hoverColor,
    },
    backgroundColor: theme.bmai.buttonFloating.background,
    color: theme.bmai.buttonFloating.color,
    height: theme.bmai.buttonFloating.smallSize,
    minHeight: theme.bmai.buttonFloating.smallSize,
    textTransform: 'capitalize',
  },
  kpi: {
    '& > svg': {
      fill: theme.bmai.palette.contrast,
    },
    '& > svg:hover': {
      fill: theme.bmai.palette.accent,
    },
    '&:focus': {
      backgroundColor: theme.bmai.palette.primaryHover,
    },
    backgroundColor: theme.bmai.palette.primary,
    color: theme.bmai.palette.contrast,
    fontSize: '1rem',
  },
  kpis: {
    paddingTop: theme.spacing.unit / 2,
  },
  title: {
    marginRight: theme.spacing.unit / 2,
  },
})

const GraphKpiList: React.SFC<IGraphKpiListProps> = ({ className, classes, graph, onAdd, onRemove }) => (
  <Grid item={true}>
    <Grid item={true}>
      <Typography className={classes.title} type="body2" align="right">
        KPIs in big graph
      </Typography>
    </Grid>
    <Grid item={true}>
      <KpiList
        classes={{ add: classes.add, list: classes.kpis, chip: classes.kpi }}
        isAddDisabled={!!!graph}
        kpis={graph ? graph.kpis : []}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </Grid>
  </Grid>
)

export default withStyles(styles)(GraphKpiList)
