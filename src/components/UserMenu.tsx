import { History } from 'history'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import * as React from 'react'
import { routeAdminUsers, routeWelcome } from '../constants/routes'

import NotificationMenu from '../containers/NotificationMenu'

const styles = theme => ({
  menuRoot: {
    top: `${theme.bmai.menu.top - 16}px!Important`,
  },
  name: {
    fontStyle: 'italic' as 'italic',
  },
  toolbar: {
    // The top right menu icon has 12px padding, so let's shift the right toolbar by 12px to the right
    // into the appbar right padding to make the icon absolute right padding same as appbar left padding.
    paddingRight: 0,
    right: -12,
  },
})

interface IUserMenuProps {
  fullname: string
  admin: boolean
  classes: { [key: string]: any }
  signOut: () => void
  history: History
}

interface IUserMenuState {
  anchorEl: HTMLElement
  showMenu: boolean
}

class UserMenu extends React.Component<IUserMenuProps, IUserMenuState> {
  public constructor(props) {
    super(props)
    this.state = { anchorEl: null, showMenu: false }
  }

  public render() {
    const { admin, fullname, classes, signOut } = this.props
    const { showMenu, anchorEl } = this.state

    if (!fullname) {
      return null
    }

    const AdminMenu = admin ? (
      <MenuItem key="am_0" onClick={this.handleAdminUsersClick} className={this.props.classes.menuItem}>
        Manage users
      </MenuItem>
    ) : null

    return (
      <Toolbar className={classes.toolbar}>
        <Typography type="body2" color="inherit" className={classes.name} align="right">
          {fullname}
        </Typography>
        <NotificationMenu />
        <IconButton color="contrast" aria-label="Menu" onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu className={classes.menuRoot} open={showMenu} anchorEl={anchorEl} onRequestClose={this.handleRequestClose}>
          {AdminMenu}
          <MenuItem onClick={this.handleWelcomeClick}>Welcome</MenuItem>
          <MenuItem onClick={this.handleSignOutClick}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    )
  }

  private handleClick = event => this.setState({ showMenu: true, anchorEl: event.currentTarget })

  private handleRequestClose = () => this.setState({ showMenu: false })

  private handleAdminUsersClick = () => {
    this.setState({ showMenu: false })
    this.props.history.push(routeAdminUsers())
  }

  private handleSignOutClick = () => {
    this.setState({ showMenu: false })
    this.props.signOut()
  }

  private handleWelcomeClick = () => {
    this.setState({ showMenu: false })
    this.props.history.push(routeWelcome())
  }
}

export default withStyles(styles)(UserMenu)
