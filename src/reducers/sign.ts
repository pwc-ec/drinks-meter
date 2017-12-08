import { handleActions } from 'redux-actions'
import { USER_SIGNIN, USER_SIGNOUT } from '../constants/actions'
import { getToken, getUserId } from '../services/auth'

const initialState: ISign = {
  token: getToken(),
  userId: getUserId(),
}

export default handleActions<any>(
  {
    [USER_SIGNIN]: (state, { payload }) => {
      return payload
    },
    [USER_SIGNOUT]: state => {
      return { token: null, userId: null }
    },
  },
  initialState,
)
