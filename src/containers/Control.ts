import * as _ from 'lodash'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import Control, { IControlProps } from '../components/Control'

import * as createConsumptionMutation from '../graphql/mutations/createConsumption.gql'
import * as getEventsQuery from '../graphql/queries/getEvents.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IControlProps {
  createConsumption: () => void
  history: any
  match: any
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
    options: ({ match: { params: { eventUrl } } }) => {
      return {
        variables: {
          filter: { url: eventUrl },
        },
      }
    },
    props: ({ data: { allEvents: response, loading }, ownProps }) => ({
      currentEvent: response ? response[0] : null,
      loading,
    }),
  }),
]

export default compose(...enhancers)(Control)
