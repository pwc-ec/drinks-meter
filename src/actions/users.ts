import { createAction } from 'redux-actions'
import * as Actions from '../constants/actions'

export const userSignIn = createAction<ISign>(Actions.USER_SIGNIN)
export const userSignOut = createAction(Actions.USER_SIGNOUT)
