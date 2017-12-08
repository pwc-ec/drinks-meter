import * as React from 'react'

import { formatDate } from '../services/format'

import DeleteForeverIcon from 'material-ui-icons/DeleteForever'
import NotificationsIcon from 'material-ui-icons/Notifications'
import NotificationsNoneIcon from 'material-ui-icons/NotificationsNone'
import RefreshIcon from 'material-ui-icons/Refresh'
import SubscriptionsIcon from 'material-ui-icons/Subscriptions'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

import { withStyles } from 'material-ui/styles'

import SubscribeModal from './SubscribeModal'

// ------------------------------------------------------------------------------------------------

const notificationMessage = (notif: INotification): string => {
  const names = notif.changedCompanies.map(c => c.name).join(', ')
  return `Data updated for companies: ${names}`
}

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  badge: {
    '& > span': {
      backgroundColor: theme.bmai.palette.black,
    },
    cursor: 'pointer',
  },
  container: {
    maxHeight: '70vh',
    overflowY: 'auto' as 'auto',
    position: 'fixed' as 'fixed',
    right: theme.bmai.menu.right,
    top: theme.bmai.menu.top,
    width: '25rem',
    zIndex: theme.zIndex.appBar,
  },
  delete: {
    '&:hover': {
      color: theme.bmai.palette.accent,
    },
    color: theme.bmai.buttonFloating.background,
  },
  edit: {
    fontWeight: 'bold' as 'bold',
  },
  root: {
    position: 'relative' as 'relative',
    right: '-0.4rem',
  },
  subheader: {
    '& > p': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  subscribe: {
    '&:hover': {
      color: theme.bmai.palette.primary,
    },
    color: theme.bmai.buttonFloating.background,
  },
})

// ------------------------------------------------------------------------------------------------

export interface INoficationMenuProps {
  allCompanies: ICompany[]
  classes?: any
  companiesReportsCount: any
  hide?: () => void
  loading?: boolean
  notifications?: INotification[]
  onDelete?: (notification: INotification) => void
  onModifySubscription?: (companies: ICompany[]) => void
  onSubscribe?: (e) => void
  open?: boolean
  openModal?: boolean
  subscribedCompaniesIds: string[]
  toggleOpen?: () => void
  toggleOpenModal?: () => void
}

// ------------------------------------------------------------------------------------------------

const NotificationMenu: React.SFC<INoficationMenuProps> = ({
  allCompanies,
  classes,
  companiesReportsCount,
  hide,
  loading,
  notifications,
  onDelete,
  onModifySubscription,
  onSubscribe,
  open,
  openModal,
  subscribedCompaniesIds,
  toggleOpen,
  toggleOpenModal,
}) => (
  <div className={classes.root} onBlur={hide}>
    <IconButton color="contrast" aria-label="Notification" onClick={toggleOpen}>
      {notifications.length ? (
        <Badge badgeContent={notifications.length} className={classes.badge}>
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsNoneIcon className={classes.badge} />
      )}
    </IconButton>

    {open ? (
      <Paper elevation={6} className={classes.container}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <RefreshIcon className={classes.loading} rotate="true" />
          </div>
        ) : (
          <List className={classes.list} dense={false}>
            <ListItem button={false}>
              <ListItemText className={classes.subheader} secondary="Notifications" />
              {/* <ListItemSecondaryAction>
                <IconButton aria-label="Modify subscription" className={classes.subscribe} onClick={onSubscribe}>
                  <Tooltip title="Modify subscription" placement="top-start">
                    <SubscriptionsIcon />
                  </Tooltip>
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
            {notifications && notifications.length ? (
              notifications.map((notif, i) => (
                <ListItem
                  aria-controls="notifiaction-read"
                  aria-haspopup="true"
                  aria-label="Notifications"
                  button={false}
                  dense={false}
                  divider={true}
                  key={notif.id}
                >
                  <ListItemText primary={notificationMessage(notif)} secondary={`${formatDate(notif.createdAt)}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete Notification"
                      className={classes.delete}
                      onClick={() => onDelete(notif)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <ListItem button={false} dense={true}>
                <ListItemText className={classes.edit} primary="No data updates notifications" />
              </ListItem>
            )}
            <ListItem button={true} onClick={onSubscribe}>
              <ListItemText className={classes.edit} primary="Edit notifications..." />
            </ListItem>
          </List>
        )}
      </Paper>
    ) : null}
    <SubscribeModal
      allCompanies={allCompanies}
      companiesReportsCount={companiesReportsCount}
      subscribedCompaniesIds={subscribedCompaniesIds}
      onClose={onModifySubscription}
      open={openModal}
    />
  </div>
)

export default withStyles(styles)(NotificationMenu)
