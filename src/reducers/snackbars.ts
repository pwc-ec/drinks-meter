import { handleActions } from 'redux-actions'
import * as Actions from '../constants/actions'

const initialState: ISnackbarsStoreState = {
  actions: {},
  autoHide: false,
  autoHideDuration: 2000,
  dismissOnClickAway: false,
  error: null,
  intent: 'info',
  message: null,
}

const updater = options => (state, { payload }) => {
  if (typeof payload === 'string') {
    payload = { message: payload }
  }
  return {
    ...initialState,
    ...options,
    ...payload,
  }
}

export default handleActions<any>(
  {
    [Actions.SHOW_INFO_SNACKBAR]: updater({ autoHide: true }),
    [Actions.SHOW_STATIC_INFO_SNACKBAR]: updater({}),
    [Actions.SHOW_SUCCESS_SNACKBAR]: updater({ intent: 'success', autoHide: true }),
    [Actions.SHOW_WARNING_SNACKBAR]: updater({ intent: 'warning' }),
    [Actions.SHOW_ERROR_SNACKBAR]: updater({ intent: 'error' }),
    [Actions.DISMISS_SNACKBAR]: () => initialState,
  } as any,
  initialState,
)
