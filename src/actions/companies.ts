import { createAction } from 'redux-actions'
import * as Actions from '../constants/actions'

export const selectCompany = createAction<ICompany>(Actions.SELECT_COMPANY)
export const deselectCompany = createAction<ICompany>(Actions.DESELECT_COMPANY)
export const suggestCompanies = createAction<ICompany>(Actions.SUGGEST_COMPANIES)
