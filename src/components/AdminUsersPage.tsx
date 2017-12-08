import * as React from 'react'

import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

import AdminUsersFilter from '../containers/AdminUsersFilter'
import AdminUsersList from '../containers/AdminUsersList'
import CreateUserForm from '../containers/CreateUserForm'
import ButtonWithTooltip from './ButtonWithTooltip'

const styles = theme => {
  const { bmai: { list: { fab, fabRoot, list } }, mixins: { gutters } } = theme
  // console.debug('list.theme', { list, list2: gutters(list), theme })
  return { fab, fabRoot, list: gutters(list) }
}

const AdminUsersPage = props => {
  const { classes, isOpenCreateUser, openCreateUser, closeCreateUser } = props

  return (
    <div className={classes.list}>
      <AdminUsersFilter />
      <AdminUsersList />
      <ButtonWithTooltip
        ariaLabel="add"
        classes={{ button: classes.fab, root: classes.fabRoot }}
        fab={true}
        tooltip="Create new user"
        onClick={openCreateUser}
      >
        <AddIcon />
      </ButtonWithTooltip>
      <CreateUserForm isOpen={isOpenCreateUser} close={closeCreateUser} />
    </div>
  )
}

export default withStyles(styles)(AdminUsersPage)
