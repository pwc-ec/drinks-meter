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

const mapConsumptionToTimeSeries = (menuBeverages: IMenuBeverage[]) => {
  if (!menuBeverages) {
    return
  }

  const result = []

  // normalize consumption by 15 minutes time slots
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

  // filter consupmtion for last 3 hours
  let lastThreeHoursConsumptions = consumptions.sort((c1, c2) => c1._timeStamp - c2._timeStamp)

  if (lastThreeHoursConsumptions.length) {
    const threeHoursAgo = moment(lastThreeHoursConsumptions[lastThreeHoursConsumptions.length - 1]._timeStamp).subtract(
      3,
      'hours',
    )
    lastThreeHoursConsumptions = lastThreeHoursConsumptions.filter(c => threeHoursAgo.isSameOrBefore(c._timeStamp))
  }

  // group consumptions by time slots
  const timeGroups = _.groupBy(lastThreeHoursConsumptions, con => con.time)

  // count individual drink consumption in each time slot
  for (const prop in timeGroups) {
    if (!timeGroups[prop]) {
      continue
    }

    const entry: any = { time: prop }

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
  mapProps(({ menuBeverages, ...rest }) => ({
    data: mapConsumptionToTimeSeries(menuBeverages),
    ...rest,
  })),
]

export default compose(...enhancers)(DrinksThroughTime)
