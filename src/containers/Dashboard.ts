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

const calcAverageAlcohol = (event: IEvent) => {
  if (!event) {
    return 0
  }
  const attendance = event.attendance
  const menuBeverages = event.menuBeverages
  const averageWeight = 75

  const array = event.menuBeverages.map((mb: IMenuBeverage) => {
    const alcohol: number = mb.beverage.alcohol
    const volume: number = mb.beverage.volume
    const consumptions: number = mb.consumptions.length
    return consumptions * alcohol * volume * 0.008
  })

  const calculation = array.reduce((a, b) => a + b, 0) / (averageWeight * attendance * 0.65)
  return (calculation * 1000).toFixed(2)
}

const calcTotalDrinks = (event: IEvent) => {
  if (!event) {
    return 0
  }
  return event.menuBeverages.map(mb => mb.consumptions.length).reduce((a, b) => a + b, 0)
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
