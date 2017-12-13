import * as _ from 'lodash'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import DrinksTotals, { IDrinksTotalsProps } from '../components/DrinksTotals'

import * as getMenuBeveragesQuery from '../graphql/queries/getMenuBeverages.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IDrinksTotalsProps {
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

  graphql<IAllMenuBeveragesResponse, IContainerProps>(getMenuBeveragesQuery, {
    options: ({ eventId, match: { params: { eventUrl } } }) => {
      return {
        fetchPolicy: 'network-only',
        pollInterval: 10000,
        variables: {
          eventId,
        },
      }
    },
    props: ({ data: { allMenuBeverages, loading }, ownProps }) => ({
      data: allMenuBeverages
        ? allMenuBeverages.map((mb, i) => ({ name: mb.beverage.name, count: mb.consumptions.length }))
        : null,
      loading,
    }),
  }),
]

export default compose(...enhancers)(DrinksTotals)
