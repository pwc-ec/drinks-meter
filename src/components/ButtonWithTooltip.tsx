import * as React from 'react'

import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import { default as th } from '../services/theme'

/**
 * Mui button with tooltip
 * @param props
 * classes: { root, tooltip, button }
 * color: default 'primary'
 * raised: default theme.bmai.button.raised
 * tooltipPlacement: default 'left'
 */
const ButtonWithTooltip = props => {
  const { ariaLabel, children, classes, color, fab, raised, tooltip, tooltipPlacement, ...rest } = props
  return (
    <div className={classes && classes.root}>
      <Tooltip title={tooltip} placement={tooltipPlacement || 'left'} className={classes && classes.tooltip}>
        <div style={{ display: 'inline-block' }}>
          <Button
            aria-label={ariaLabel || tooltip}
            className={classes && classes.button}
            color={color || 'primary'}
            fab={fab}
            raised={raised || th.bmai.button.raised}
            {...rest}
          >
            {children}
          </Button>
        </div>
      </Tooltip>
    </div>
  )
}

export default ButtonWithTooltip
