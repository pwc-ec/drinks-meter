import { compose, withHandlers, withProps, withState } from 'recompose'
import KpiChart from '../components/KpiChart'

const enhancers = [
  withState('minYear', 'setMinYear', null),
  withState('maxYear', 'setMaxYear', null),
  withState('showRange', 'setShowRange', false),
  withHandlers({
    onRangeChange: ({ setMinYear, setMaxYear }) => value => {
      setMinYear(value[0])
      setMaxYear(value[1])
    },
  }),
]

export default compose(...enhancers)(KpiChart)
