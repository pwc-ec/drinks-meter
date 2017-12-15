import * as _ from 'lodash'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, mapProps, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import PartyIndex, { IPartyIndexProps } from '../components/PartyIndex'

import * as getMenuBeveragesQuery from '../graphql/queries/getMenuBeverages.gql'

// ------------------------------------------------------------------------------------------------

const calcPartyIndex = (event: IEvent) => {
  const attendance = event.attendance
  const menuBeverages = event.menuBeverages
  const averageWeight = 75

  const array = event.menuBeverages.map((mb: IMenuBeverage) => {
    const alcohol: number = mb.beverage.alcohol
    const volume: number = mb.beverage.volume
    const consumptions: number = mb.consumptions.length
    return consumptions * alcohol * volume * 0.008
  })

  const calculation = array.reduce((a, b) => a + b, 0) / (averageWeight * attendance * 0.65) * 1000
  const partyIndex = calculation

  const normalize = 1 - (3 - Math.min(partyIndex, 3)) / 3

  if (!normalize) {
    return 1
  }

  const logit = Math.log(normalize / (1 - normalize)) / Math.log(10000)
  const result = Math.ceil(logit * 10 + 2.5)
  return result < 6 ? result : 5
}

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IPartyIndexProps {
  event: IEvent // passed from parrent component
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  mapProps(({ event, classes }) => ({
    classes,
    imageUrl: event.url,
    index: calcPartyIndex(event),
  })),
]

export default compose(...enhancers)(PartyIndex)
