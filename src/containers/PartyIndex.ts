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
  return 1
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
