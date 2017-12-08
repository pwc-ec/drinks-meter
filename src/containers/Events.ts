import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import Events, { IEventsProps } from '../components/Events'

import * as getEventsQuery from '../graphql/queries/getEvents.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IEventsProps {
  history: any
}

// ------------------------------------------------------------------------------------------------

const mapStateToProps = (state: IRootState) => {
  return {}
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

  graphql<IallEventsResponse, IContainerProps>(getEventsQuery, {
    props: ({ data: { allEvents: response, loading }, ownProps }) => ({
      events: response || [],
      loading,
    }),
  }),
]

export default compose(...enhancers)(Events)
