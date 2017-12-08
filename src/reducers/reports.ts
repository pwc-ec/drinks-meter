import { handleActions } from 'redux-actions'
import * as Actions from '../constants/actions'

const initialState: IReportsStoreState = {
  active: null,
  data: [],
  loading: false,
  saving: false,
}

export default handleActions<any>(
  {
    [Actions.REPORT_CREATE_REQUEST]: (state, { payload }) => {
      return {
        ...state,
        saving: true,
      }
    },
    [Actions.REPORT_CREATE_SUCCESS]: (state, { payload }) => {
      return {
        active: payload,
        data: [...state.data, payload].sort((rep1, rep2) => rep1.name.compareTo(rep2.name)),
        saving: false,
      }
    },
    [Actions.REPORT_CREATE_FAIL]: (state, { payload }) => {
      return {
        ...state,
        saving: false,
      }
    },
  },
  initialState,
)
