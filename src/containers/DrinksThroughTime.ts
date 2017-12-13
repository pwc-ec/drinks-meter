import * as _ from 'lodash'
import * as moment from 'moment'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import DrinksThroughTime, { IDrinksThroughTimeProps } from '../components/DrinksThroughTime'

import * as getMenuBeveragesQuery from '../graphql/queries/getMenuBeverages.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IDrinksThroughTimeProps {
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

const mapConsumptionToTimeSeries = (menuBeverages: IMenuBeverage[]) => {
  if (!menuBeverages) {
    return
  }

  const result = []

  const consumptions: any[] = []
  menuBeverages.forEach(mb => {
    mb.consumptions.forEach(con => {
      const m = con.consumedAt ? moment(con.consumedAt) : moment()
      consumptions.push({
        name: mb.beverage.name,
        time: `${m.hour()}:${Math.floor(m.minute() / 10)}0`,
      })
    })
  })

  const timeGroups = _.groupBy(consumptions, con => con.time)
  console.log(timeGroups)

  for (const prop in timeGroups) {
    if (!timeGroups[prop]) {
      continue
    }

    const entry: any = {
      time: prop,
    }

    timeGroups[prop].forEach((con: any) => {
      entry[con.name] = entry[con.name] ? entry[con.name] + 1 : 1
    })

    result.push(entry)
  }

  console.log(result)

  return result
}

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
    props: ({ data: { allMenuBeverages, loading }, ownProps }) => {
      const timeSeries = mapConsumptionToTimeSeries(allMenuBeverages)
      return {
        data: timeSeries,
        loading,
      }
    },
  }),
]

export default compose(...enhancers)(DrinksThroughTime)
