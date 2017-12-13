import * as _ from 'lodash'
import * as moment from 'moment'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { branch, compose, mapProps, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import DrinksThroughTime, { IDrinksThroughTimeProps } from '../components/DrinksThroughTime'

import * as getMenuBeveragesQuery from '../graphql/queries/getMenuBeverages.gql'

// ------------------------------------------------------------------------------------------------

interface IContainerProps extends IDrinksThroughTimeProps {
  history: any
  match: any
  menuBeverages: IMenuBeverage[] // passed from parrent component
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
      const hourPart = Math.floor(m.minute() / 15)
      let label = '00'
      switch (hourPart) {
        case 1:
          label = '15'
          break
        case 2:
          label = '30'
          break
        case 3:
          label = '45'
          break
        default:
          label = '00'
      }
      consumptions.push({
        _timeStamp: m.toDate(),
        name: mb.beverage.name,
        time: `${m.hour()}:${label}`,
      })
    })
  })

  const threeHoursAgo = moment().subtract(3, 'hours')
  // console.log('------- VLADR: threeHoursAgo', threeHoursAgo)

  const lastThreeHoursConsumptions = consumptions.filter(c => threeHoursAgo.isSameOrBefore(c._timeStamp))

  const timeGroups = _.groupBy(lastThreeHoursConsumptions, con => con.time)
  // console.log(timeGroups)

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

  // console.log(result)

  return result
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  withRouter,

  connect(mapStateToProps, mapDispatchToProps),

  mapProps(({ menuBeverages, ...rest }) => ({
    data: mapConsumptionToTimeSeries(menuBeverages),
    ...rest,
  })),

  // graphql<IAllMenuBeveragesResponse, IContainerProps>(getMenuBeveragesQuery, {
  //   options: ({ eventId, match: { params: { eventUrl } } }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       pollInterval: 10000,
  //       variables: {
  //         eventId,
  //       },
  //     }
  //   },
  //   props: ({ data: { allMenuBeverages, loading }, ownProps }) => {
  //     const timeSeries = mapConsumptionToTimeSeries(allMenuBeverages)
  //     return {
  //       data: timeSeries,
  //       loading,
  //     }
  //   },
  // }),
]

export default compose(...enhancers)(DrinksThroughTime)
