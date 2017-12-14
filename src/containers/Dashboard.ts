import * as _ from 'lodash'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import Dashboard, { IDashboardProps } from '../components/Dashboard'

import * as getEventsQuery from '../graphql/queries/getEvents.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IDashboardProps {
  history: any
  match: any
}

// ------------------------------------------------------------------------------------------------

const calcTotalDrinks = event => {
  if (!event) {
    return 0
  }
  return event.menuBeverages.map(mb => mb.consumptions.length).reduce((a, b) => a + b, 0)
}

const calcAverageAlcohol = event => {
  return [{ name: 'avg', value: 1.5 }, { name: 'max', value: 5 }]
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  withRouter,

  graphql<IallEventsResponse, IContainerProps>(getEventsQuery, {
    options: ({ match: { params: { eventUrl } } }) => {
      return {
        fetchPolicy: 'network-only',
        pollInterval: 10000,
        variables: {
          filter: { url: eventUrl },
        },
      }
    },
    props: ({ data: { allEvents: response, loading }, ownProps }) => {
      const currentEvent = response ? response[0] : null
      return {
        averageAlcohol: calcAverageAlcohol(currentEvent),
        currentEvent,
        loading,
        totalDrinks: calcTotalDrinks(currentEvent),
      }
    },
  }),
]

export default compose(...enhancers)(Dashboard)
