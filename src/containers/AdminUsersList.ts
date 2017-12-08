import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { showErrorSnackbar } from '../actions/snackbars'

import AdminUsersList from '../components/AdminUsersList'
import { getUsers } from '../graphql/queries/getUsers'
import { form } from './AdminUsersFilter'

const enhancers = [
  connect(
    ({ form: { [form]: formState } }) => ({
      userFilter: formState && formState.values,
    }),
    {
      showErrorSnackbar,
    },
  ),

  getUsers({ filterProp: 'userFilter' }),
]

export default compose(...enhancers)(AdminUsersList)
