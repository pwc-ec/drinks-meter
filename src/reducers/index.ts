import { routerReducer } from 'react-router-redux'
import { combineReducers, Reducer } from 'redux'
import { reducer as formReducer } from 'redux-form'

import apolloClient from '../services/apolloClient'
import companies from './companies'
import reports from './reports'
import sign from './sign'
import snackbars from './snackbars'

export default combineReducers<IRootState>({
  apollo: apolloClient.reducer(),
  companies,
  form: formReducer,
  reports,
  routing: routerReducer,
  sign,
  snackbars,
})
