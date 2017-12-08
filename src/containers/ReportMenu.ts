import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import ReportMenu, { IReportMenuProps } from '../components/ReportMenu'
import { routeCreateReport, routeDashboard } from '../constants/routes'

import * as deleteGraphMutation from '../graphql/mutations/deleteGraph.gql'
import * as deleteReportMutation from '../graphql/mutations/deleteReport.gql'
import * as updateUserLastReportMutation from '../graphql/mutations/updateUserLastReport.gql'
import * as getReportsByUserIdQuery from '../graphql/queries/getReportsByUserId.gql'
import * as getUserQuery from '../graphql/queries/getUser.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IReportMenuProps {
  deleteGraph: () => void
  deleteReport: () => void
  updateUserLastReport: () => void // gql muattion
  userId: string // comes from app state
  history: any
}

// ------------------------------------------------------------------------------------------------

const mapStateToProps = (state: IRootState) => {
  return {
    userId: state.sign.userId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  showError: msg => dispatch(showErrorSnackbar(msg)),
  showInfo: msg => dispatch(showInfoSnackbar(msg)),
  showSuccess: msg => dispatch(showSuccessSnackbar(msg)),
})

// ------------------------------------------------------------------------------------------------

const enhancers = [
  withRouter,

  connect(mapStateToProps, mapDispatchToProps),

  branch(({ location: { pathname }, userId }) => !userId, renderComponent(() => null)),

  graphql<IAllReports, IContainerProps>(getReportsByUserIdQuery, {
    options: ({ userId }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: userId ? userId : '',
      },
    }),
    props: ({ data: { allReports, loading }, ownProps }) => ({
      reports: allReports ? [...allReports].sort((r1, r2) => r1.name.localeCompare(r2.name)) : [],
    }),
  }),

  graphql<IUserData, IContainerProps>(getUserQuery, {
    options: ({ userId }) => ({
      variables: {
        id: userId ? userId : '',
      },
    }),
    props: ({ data, ownProps }) => ({
      activeReportId: data && data.User && data.User.lastReport ? data.User.lastReport.id : null,
    }),
  }),

  graphql<IReport, IContainerProps>(updateUserLastReportMutation, {
    name: 'updateUserLastReport',
  }),

  graphql<IGraph, IContainerProps>(deleteGraphMutation, {
    name: 'deleteGraph',
  }),

  graphql<IReport, IContainerProps>(deleteReportMutation, {
    name: 'deleteReport',
    options: ({ userId, history }) => ({
      update: (store, { data: { deleteReport } }) => {
        const data = store.readQuery<IAllReports>({ query: getReportsByUserIdQuery, variables: { userId } })
        data.allReports = data.allReports.filter(r => r.id !== deleteReport.id)
        store.writeQuery({ query: getReportsByUserIdQuery, variables: { userId }, data })
        /*
        if (!data.allReports || !data.allReports.length) {
          history.push(routeCreateReport())
        }*/
      },
    }),
  }),

  withState('open', 'toggleOpen', false),

  withHandlers({
    hide: ({ toggleOpen }) => e => {
      setTimeout(() => toggleOpen(false), 200)
    },

    onCreate: ({ history }) => () => {
      history.push(routeCreateReport())
    },

    onDelete: ({
      activeReportId,
      history,
      deleteGraph,
      deleteReport,
      reports,
      showSuccess,
      showError,
      toggleOpen,
      updateUserLastReport,
      userId,
    }) => reportToDelete => {
      toggleOpen(false)

      const promises = []
      reportToDelete.graphs.forEach(g => {
        promises.push(deleteGraph({ variables: { id: g.id } }))
      })

      Promise.all(promises).then(values => {
        deleteReport({ variables: { id: reportToDelete.id } })
          .then(({ data }) => {
            showSuccess(`Successfully deleted report "${data.deleteReport.name}"`)

            if (activeReportId === reportToDelete.id) {
              const otherReport = reports.find(r => r.id !== reportToDelete.id)
              updateUserLastReport({
                variables: { userId: userId ? userId : '', reportId: otherReport ? otherReport.id : null },
              })
            }
          })
          .catch(err => {
            showError(`Failed to delete report ${reportToDelete.name}`)
            console.error('ReportMenu: deleteReport mutation failed', err)
          })

        history.push(routeDashboard())
      })
    },

    onSelect: ({ history, showError, toggleOpen, updateUserLastReport, userId }) => report => {
      toggleOpen(false)
      updateUserLastReport({ variables: { userId, reportId: report.id } })
        .then(userResponse => {
          history.push(routeDashboard())
        })
        .catch(error => {
          showError('Failed to update user last report')
          console.error('ReportMenu: updateUserLastReport mutation failed', error)
        })
    },

    toggleOpen: ({ toggleOpen }) => e => toggleOpen(open => !open),
  }),
]

export default compose(...enhancers)(ReportMenu)
