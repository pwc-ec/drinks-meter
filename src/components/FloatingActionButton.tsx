import * as React from 'react'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Tooltip from 'material-ui/Tooltip'

const styles = theme => {
  const { bmai: { list } } = theme
  return list
}

// TODO: vladr: Delete, replaced by more general ButtonWithTooltip
const FloatingActionButton = props => {
  const { children, classes, className, classNamePlaceholder, classNameTooltip, tooltip, ...pass } = props
  return (
    <div className={`${classNamePlaceholder || ''} ${classes.floatingActionButtonPlaceholder || ''}`}>
      <Tooltip
        title={tooltip}
        placement="left"
        className={`${classNameTooltip || ''} ${classes.floatingActionButtonTooltip || ''}`}
      >
        <Button
          fab={true}
          color="accent"
          aria-label="add"
          className={`${className || ''} ${classes.floatingActionButton || ''}`}
          {...pass}
        >
          {children}
        </Button>
      </Tooltip>
    </div>
  )
}

export default withStyles(styles)(FloatingActionButton)
