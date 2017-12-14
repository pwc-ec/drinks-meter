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
    return consumptions * alcohol * volume * 0.08
  })

  const calculation = array.reduce((a, b) => a + b, 0) / (averageWeight * 0.7)
  const partyIndex = Math.ceil(calculation / attendance * 1000)
  return partyIndex > 1 ? (partyIndex > 5 ? 5 : partyIndex) : 1
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
