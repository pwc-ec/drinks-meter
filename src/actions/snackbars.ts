import { createAction } from 'redux-actions'
import * as Actions from '../constants/actions'

export const showInfoSnackbar = createAction<ISnackbar>(Actions.SHOW_INFO_SNACKBAR)
export const showStaticInfoSnackbar = createAction<ISnackbar>(Actions.SHOW_STATIC_INFO_SNACKBAR)
export const showSuccessSnackbar = createAction<ISnackbar>(Actions.SHOW_SUCCESS_SNACKBAR)
export const showWarningSnackbar = createAction<ISnackbar>(Actions.SHOW_WARNING_SNACKBAR)
export const showErrorSnackbar = createAction<ISnackbar>(Actions.SHOW_ERROR_SNACKBAR)
export const dismissSnackbar = createAction<ISnackbar>(Actions.DISMISS_SNACKBAR)
