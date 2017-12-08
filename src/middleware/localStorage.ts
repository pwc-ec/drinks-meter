import { USER_SIGNIN, USER_SIGNOUT } from '../constants/actions'
import { clear, setToken, setUserId } from '../services/auth'

export default store => next => action => {
  if (action.type === USER_SIGNIN) {
    setToken(action.payload.token)
    setUserId(action.payload.userId)
  }

  if (action.type === USER_SIGNOUT) {
    clear()
  }

  return next(action)
}
