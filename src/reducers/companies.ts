import { handleActions } from 'redux-actions'
import * as Actions from '../constants/actions'

const initialState: ICompaniesStoreState = {
  data: [],
  loading: false,
  selected: [],
  suggestCompanyInput: '',
}

export default handleActions<any>(
  {
    [Actions.DESELECT_COMPANY]: (state, { payload }) => {
      return {
        ...state,
        selected: state.selected.filter(c => c.id !== payload.id),
      }
    },
    [Actions.SELECT_COMPANY]: (state, { payload }) => {
      return {
        ...state,
        selected: [...state.selected, payload],
      }
    },
    [Actions.SUGGEST_COMPANIES]: (state, { payload }) => {
      return {
        ...state,
        suggestCompanyInput: payload,
      }
    },
  },
  initialState,
)
