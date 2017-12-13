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

  graphql<IGraph, IContainerProps>(createConsumptionMutation, {
    name: 'createConsumption',
  }),

  withHandlers({
    onAddConsumption: ({ createConsumption, showError, showSuccess }) => menuBeverageId => {
      console.log('------- VLADR: menuBeverageId', menuBeverageId)
      createConsumption({ variables: { consumedAt: new Date(), menuBeverageId } })
        .then(response => {
          showSuccess('Consumption added')
        })
        .catch(err => {
          showError('Failed to add consumption')
          console.error(`Failed to add consumption for menu beverage id=${menuBeverageId}`, err)
        })
    },
  }),
]

export default compose(...enhancers)(Control)
