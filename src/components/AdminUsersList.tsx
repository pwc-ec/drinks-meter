import * as React from 'react'

import CheckIcon from 'material-ui-icons/Check'
import NotInterestedIcon from 'material-ui-icons/NotInterested'
import PersonIcon from 'material-ui-icons/Person'
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

import Progress from './Progress'

const styles = theme => {
  const { bmai: { list } } = theme
  return list
}

const adminIcon = classes => (
  <Tooltip title="Administrator" placement="bottom">
    <SupervisorAccountIcon titleAccess="Administrator" className={classes.accentIcon} />
  </Tooltip>
)

const userIcon = classes => (
  <Tooltip title="User" placement="bottom">
    <PersonIcon titleAccess="User" className={classes.defaultIcon} />
  </Tooltip>
)

const enabledIcon = classes => (
  <Tooltip title="Enabled" placement="bottom">
    <CheckIcon titleAccess="Enabled" className={classes.defaultIcon} />
  </Tooltip>
)

const disabledIcon = classes => (
  <Tooltip title="Disabled" placement="bottom">
    <NotInterestedIcon titleAccess="Disabled" className={classes.accentIcon} />
  </Tooltip>
)

const renderUser = classes => user => {
  const { id, fullname, email, employer, isAdmin, isEnabled } = user

  return (
    <ListItem key={id} button={true} dense={true} disableGutters={true} className={classes.listItem}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={6} sm={4}>
          <ListItemText primary={fullname} className={classes.listItemText} />
        </Grid>
        <Grid item={true} hidden={{ xsDown: true }} sm={4}>
          <ListItemText primary={email} className={classes.listItemText} />
        </Grid>
        <Grid item={true} xs={4} sm={2}>
          {employer ? <ListItemText primary={employer.name} className={classes.listItemText} /> : null}
        </Grid>
        <Grid item={true} xs={1} sm={1} container={true} spacing={0} justify="center">
          {isAdmin ? adminIcon(classes) : userIcon(classes)}
        </Grid>
        <Grid item={true} xs={1} sm={1} container={true} spacing={0} justify="center">
          {isEnabled ? enabledIcon(classes) : disabledIcon(classes)}
        </Grid>
      </Grid>
    </ListItem>
  )
}

const AdminUsersList = props => {
  const { classes, users, usersLoading } = props

  const progress = usersLoading ? <Progress /> : null
  const data =
    users && users.length ? (
      <List className={classes.data}>{users.map(renderUser(classes))}</List>
    ) : usersLoading ? (
      <Typography className={classes.loading} type="display2" align="center">
        Loading users&hellip;
      </Typography>
    ) : (
      <Typography className={classes.noData} type="display2" align="center">
        No matching users
      </Typography>
    )

  return (
    <div>
      {progress}
      {data}
    </div>
  )
}

export default withStyles(styles)(AdminUsersList)
