import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import DashboardPage, { IDashboardPageProps } from '../components/DashboardPage'
import LoadingText from '../components/LoadingText'

import * as _ from 'lodash'
import * as createGraphMutation from '../graphql/mutations/createGraph.gql'
import * as updateGraphKpisMutation from '../graphql/mutations/updateGraphKpis.gql'
import * as updateGraphPositionMutation from '../graphql/mutations/updateGraphPosition.gql'
import * as getReportQuery from '../graphql/queries/getReport.gql'

import { routeCreateReport } from '../constants/routes'

// ------------------------------------------------------------------------------------------------

const udpateReportGraphsPositions = (mutateGraph, newGraphId, reportGraphs) => {
  reportGraphs.forEach((g, i) => {
    if (g.id !== newGraphId) {
      const position = g.position ? g.position + 1 : i + 1
      mutateGraph({ variables: { id: g.id, position } }).catch(err => console.log('updateGraphPosition failed', err))
    }
  })
}

// ------------------------------------------------------------------------------------------------

const mapStateToProps = (state: IRootState) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showError: msg => dispatch(showErrorSnackbar(msg)),
    showInfo: msg => dispatch(showInfoSnackbar(msg)),
    showSuccess: msg => dispatch(showSuccessSnackbar(msg)),
  }
}

interface IProps extends IDashboardPageProps {
  user: IUser // comes from parent components through authentication process
  createGraph: () => Promise<IGraph | any>
  removeGraph: () => Promise<any>
  toggleNewGraph: () => void
  updateGraphKpis: () => Promise<IGraph | any>
  updateGraphPosition: () => Promise<IGraph | any>
  history: any
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  connect(mapStateToProps, mapDispatchToProps),

  // TODO: Add query error warning UI.
  graphql<IReportResponse, IProps>(getReportQuery, {
    options: ({ user: { lastReport } }) => ({
      variables: {
        reportId: lastReport ? lastReport.id : '',
      },
    }),
    props: ({ data: { Report: report }, ownProps }) => {
      const reportCompanies = report ? report.companies : []
      const bigGraph = report ? report.graphs.find(g => g.position === 0) : null

      const companiesAllKpis = reportCompanies.reduce((kpis, company) => kpis.concat(company.kpis), [])
      const companiesKpis = _.intersectionWith(companiesAllKpis, (kpi1, kpi2) => kpi1.id === kpi2.id).sort(
        (kpi1, kpi2) => kpi1.name.localeCompare(kpi2.name),
      )

      return {
        bigGraph,
        companiesKpis,
        report,
        reportCompanies,
      }
    },
  }),

  branch(({ report }) => !report, renderComponent(LoadingText)),

  // Updates list of kpis for the big/active/main graph
  graphql<IGraph, IProps>(createGraphMutation, {
    name: 'createGraph',
    options: ownProps => {
      if (!ownProps.user.lastReport) {
        ownProps.history.push(routeCreateReport())
        return {}
      }
      const reportId = ownProps.user.lastReport.id
      return {
        // const { user: { lastReport: { id: reportId } } } = ownProps
        update: (store, { data: { createGraph } }) => {
          const data = store.readQuery<IReportResponse>({ query: getReportQuery, variables: { reportId } })
          const { graphs } = data.Report
          graphs.forEach((g, i) => (g.position ? g.position + 1 : i + 1))
          graphs.splice(0, 0, createGraph)
          store.writeQuery({ query: getReportQuery, variables: { reportId }, data })
        },
      }
    },
  }),

  // Updates list of kpis for the big/active/main graph
  graphql<IGraph, IProps>(updateGraphKpisMutation, {
    name: 'updateGraphKpis',
  }),

  graphql<IGraph, IProps>(updateGraphPositionMutation, {
    name: 'updateGraphPosition',
  }),

  withState('newGraph', 'toggleNewGraph', false),
  withState('openSelectKpi', 'toggleOpenSelectKpi', false),
  withState('firstOpenSelectKpi', 'toggleFirstOpenSelectKpi', true),

  withHandlers({
    onAddGraph: ({ toggleNewGraph, toggleOpenSelectKpi }) => () => {
      toggleNewGraph(true)
      toggleOpenSelectKpi(true)
    },

    onAddKpi: ({
      bigGraph,
      createGraph,
      newGraph,
      report: { id: reportId, graphs: reportGraphs },
      showError,
      showSuccess,
      toggleNewGraph,
      toggleOpenSelectKpi,
      toggleFirstOpenSelectKpi,
      updateGraphKpis,
      updateGraphPosition,
    }) => kpis => {
      // close modal dialog a and reset newGraph state
      toggleFirstOpenSelectKpi(false)
      toggleOpenSelectKpi(false)
      toggleNewGraph(false)
      if (!kpis) {
        return
      }

      const mutateParams = {
        variables: {
          graphId: bigGraph ? bigGraph.id : null,
          kpisIds: (bigGraph && !newGraph ? bigGraph.kpis : []).concat(kpis).map(kpi => kpi.id),
        },
      }

      const promise: any = null

      if (newGraph) {
        createGraph({ variables: { reportId } })
          .then(({ data }) => {
            showSuccess('Graph successfully created')

            const { createGraph: { id: graphId } } = data
            mutateParams.variables.graphId = graphId

            updateGraphKpis(mutateParams)
              .then(response => {
                udpateReportGraphsPositions(updateGraphPosition, graphId, reportGraphs)
              })
              .catch(err => {
                showError(`Failed to update graphs' positions`)
                console.error('onAddKpi: updateGraphKpis failed', err)
              })
          })
          .catch(err => {
            showError(`Failed to create a new graph`)
            console.error('onAddKpi: createGraph failed', err)
          })
      } else {
        updateGraphKpis(mutateParams).catch(err => {
          showError(`Failed to add KPI to the graph`)
          console.error('onAddKpi: updateGraphKpis failed', err)
        })
      }
    },

    onRemoveKpi: ({ bigGraph, showError, updateGraphKpis }) => kpi => {
      const mutateParams = {
        variables: {
          graphId: bigGraph.id,
          kpisIds: bigGraph.kpis.filter(k => k.id !== kpi.id).map(k => k.id),
        },
      }
      updateGraphKpis(mutateParams).catch(err => {
        showError(`Failed to create a graph: ${err.toSttring()}`)
        console.error('onRemoveKpi: updateGraphKpis::Error', err, kpi)
      })
    },

    onSelectKpi: ({ toggleOpenSelectKpi }) => () => {
      toggleOpenSelectKpi(true)
    },

    toggleFirstOpenSelectKpi: ({ toggleFirstOpenSelectKpi }) => () =>
      toggleFirstOpenSelectKpi(firstOpenSelectKpi => !firstOpenSelectKpi),
    toggleNewGraph: ({ toggleNewGraph }) => () => toggleNewGraph(newGraph => !newGraph),
    toggleOpenSelectKpi: ({ toggleOpenSelectKpi }) => () => toggleOpenSelectKpi(openSelectKpi => !openSelectKpi),
  }),
]

export default compose(...enhancers)(DashboardPage)
