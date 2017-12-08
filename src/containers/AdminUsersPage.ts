import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers, withState } from 'recompose'

import AdminUsersPage from '../components/AdminUsersPage'

const openCreateUser = ({ controlCreateUser }) => () => controlCreateUser(true)
const closeCreateUser = ({ controlCreateUser }) => () => controlCreateUser(false)

const enhancers = [
  withRouter,

  withState('isOpenCreateUser', 'controlCreateUser', false),

  withHandlers({ closeCreateUser, openCreateUser }),
]

export default compose(...enhancers)(AdminUsersPage)
