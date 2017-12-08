import * as React from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Joyride from 'react-joyride'

import { withStyles } from 'material-ui/styles'

import Graph from '../containers/Graph'
import GraphKpiList from './GraphKpiList'
import NewGraphButton from './NewGraphButton'
import SelectKpiModal from './SelectKpiModal'

// ------------------------------------------------------------------------------------------------

const simpleGraphList = (bigGraphId, graphs, reportCompanies, reportId) => {
  const items = graphs.sort((a, b) => a.position - b.position).map(graph => {
    const name = graph.kpis
      .map(kpi => kpi.name)
      .sort()
      .join(' | ')
    return (
      <Graph
        bigGraphId={bigGraphId}
        key={'g_' + graph.id}
        simple={true}
        name={name}
        count={graphs.length}
        graph={graph}
        companies={reportCompanies}
        reportId={reportId}
      />
    )
  })
  return items
}

const joyrideSteps = [
  {
    selector: 'main > div > div:nth-child(2) button',
    text: 'Click here to open dialog for KPI selection, select one or more KPIs and click OK to create a new graph',
    title: 'Next step',
  },
]

// ------------------------------------------------------------------------------------------------

export interface IDashboardPageProps {
  bigGraph: IGraph
  classes: any
  companiesKpis: IKpi[]
  firstOpenSelectKpi: boolean
  newGraph: boolean
  onAddGraph: () => void
  onAddKpi: (kpis: IKpi[]) => void
  onRemoveKpi: (kpi: IKpi) => void
  onSelectKpi: () => void
  openSelectKpi: boolean
  report?: IReport
  reportCompanies: ICompany[]
  reportId?: string
}

const styles = theme => ({
  bar: {
    borderBottom: `1px solid ${theme.bmai.palette.lightBlack}`,
    padding: theme.bmai.padding.size,
  },
  fullHeight: {
    height: '100%',
  },
  header: {
    borderBottom: `1px solid ${theme.bmai.palette.lightGrey}`,
    paddingBottom: theme.spacing.unit * 4,
  },
  nodata: {
    paddingTop: theme.bmai.padding.size,
  },
  root: {
    height: `calc(100% - ${theme.bmai.appHeader.height}px - ${theme.bmai.padding.size} - ${theme.spacing.unit * 6}px)`,
    padding: theme.bmai.padding.size,
  },
  sidebar: {
    height: `calc(100% + ${theme.bmai.appHeader.height}px + ${theme.bmai.padding.size} + ${theme.spacing.unit * 6}px)`,
    overflowY: 'auto' as 'auto',
  },
})

const DashboardPage: React.SFC<IDashboardPageProps> = ({
  classes,
  bigGraph,
  companiesKpis,
  firstOpenSelectKpi,
  newGraph,
  onAddGraph,
  onAddKpi,
  onRemoveKpi,
  onSelectKpi,
  openSelectKpi,
  report,
  reportCompanies,
}) => (
  <Grid className={classes.root} container={true} direction="row">
    <Grid className={classes.fullHeight} item={true} xs={9}>
      <Grid className={classes.fullHeight} container={true} direction="column" wrap="nowrap">
        <Grid item={true}>
          <Grid
            alignContent="space-between"
            alignItems="stretch"
            className={classes.header}
            container={true}
            direction="row"
            justify="space-between"
          >
            <Grid item={true}>
              <Typography type="body2">Selected companies</Typography>
              <Typography type="display1">{report ? report.name : 'Loading...'}</Typography>
            </Grid>
            <GraphKpiList graph={bigGraph} onAdd={onSelectKpi} onRemove={onRemoveKpi} />
          </Grid>
        </Grid>
        <Grid className={classes.fullHeight} item={true}>
          {bigGraph ? (
            <Graph
              bigGraphId={bigGraph.id}
              simple={false}
              name={bigGraph.kpis
                .map(kpi => kpi.name)
                .sort()
                .join(' | ')}
              graph={bigGraph}
              companies={reportCompanies}
              reportId={report.id}
            />
          ) : (
            <Typography className={classes.nodata} type="title">
              Report has no graph
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
    <Grid className={classes.sidebar} item={true} xs={3}>
      <NewGraphButton simple={report.graphs.length > 1} onClick={onAddGraph} />
      {simpleGraphList(
        bigGraph && bigGraph.id,
        report.graphs.filter(g => g.id !== bigGraph.id),
        reportCompanies,
        report.id,
      )}
    </Grid>
    <SelectKpiModal
      allKpis={companiesKpis}
      open={openSelectKpi || (firstOpenSelectKpi && report && !report.graphs.length)}
      selectedKpis={bigGraph && !newGraph ? bigGraph.kpis : []}
      onClose={onAddKpi}
    />
    <Joyride
      debug={true}
      run={!(report && report.graphs && report.graphs.length)}
      autoStart={true}
      showSkipButton={true}
      showStepsProgress={true}
      steps={joyrideSteps}
      allowClicksThruHole={true}
      type="continuous"
      showOverlay={false}
    />
  </Grid>
)

export default withStyles(styles)(DashboardPage)
