import * as cn from 'classnames'
import CloseIcon from 'material-ui-icons/Close'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, pure, withHandlers } from 'recompose'
import { dismissSnackbar } from '../actions/snackbars'

const styles = theme => {
  const { bmai: { snackbar: { content, intent } }, spacing: { unit } } = theme

  return {
    ...intent,
    close: {
      height: unit * 4,
      width: unit * 4,
    },
    content,
  }
}

const PresetSnackbar = props => {
  const {
    actions,
    autoHide,
    autoHideDuration,
    message,
    intent,
    error,
    classes,
    // tslint:disable-next-line: no-shadowed-variable
    dismissSnackbar,
    // tslint:disable-next-line: no-shadowed-variable
    handleRequestClose,
  } = props

  if (!message) {
    return null
  }

  const actionButtons = actions
    ? Object.keys(actions).map((label, index) => (
        <Button key={index} color="inherit" dense={true} onClick={actions[label]}>
          {label}
        </Button>
      ))
    : []

  actionButtons.push(
    <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={dismissSnackbar}>
      <CloseIcon />
    </IconButton>,
  )

  // Note: Use undefined to disable autoHideDuration, due to Material-UI Next Snackbar bug.
  return (
    <Snackbar
      open={true}
      autoHideDuration={(autoHide && autoHideDuration) || undefined}
      onRequestClose={handleRequestClose}
      SnackbarContentProps={{
        'aria-describedby': 'snackbar-message',
        className: cn(classes[intent], classes.content),
      }}
      message={
        <span id="snackbar-message">
          {message}
          {error ? <div>{error.toString()}</div> : ''}
        </span>
      }
      action={actionButtons}
    />
  )
}

// tslint:disable-next-line: no-shadowed-variable
const handleRequestClose = ({ dismissOnClickAway, dismissSnackbar }) =>
  dismissOnClickAway ? dismissSnackbar : (event, reason) => (reason === 'clickaway' ? null : dismissSnackbar())

const enhancers = [
  connect(({ snackbars }) => snackbars, { dismissSnackbar }),
  withHandlers({ handleRequestClose }),
  pure,
  withStyles(styles),
]

export default compose(...enhancers)<any>(PresetSnackbar)
