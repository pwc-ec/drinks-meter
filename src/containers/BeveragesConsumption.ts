import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import BeveragesConsumption, { IBeveragesConsumptionProps } from '../components/BeveragesConsumption'

import * as getEventBeveragesConsupmtionQuery from '../graphql/queries/getEventBeveragesConsupmtion.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IBeveragesConsumptionProps {
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

  graphql<IEventResponse, IContainerProps>(getEventBeveragesConsupmtionQuery, {
    options: props => ({
      variables: {
        id: 'cjawweanf4noh0144wwo870q0',
      },
    }),
    props: ({ data: { Event: response, loading }, ownProps }) => ({
      loading,
      menuBeverages: (response && response.menuBeverages) || [],
    }),
  }),
]

export default compose(...enhancers)(BeveragesConsumption)
