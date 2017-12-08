import { createAction } from 'redux-actions'
import * as Actions from '../constants/actions'

export const reportCreateRequest = createAction(Actions.REPORT_CREATE_REQUEST)
export const reportCreateSuccess = createAction<IReport>(Actions.REPORT_CREATE_SUCCESS)
export const reportCreateFail = createAction<IReport>(Actions.REPORT_CREATE_FAIL)
