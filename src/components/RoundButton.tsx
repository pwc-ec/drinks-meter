import * as React from 'react'

import * as cn from 'classnames'

import { ButtonBase, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'

const styles = theme => ({
  content: {
    position: 'absolute' as 'absolute',
  },
  disabled: {
    opacity: 0.5,
  },
  root: {
    border: `1px solid ${fade('#fff', 0.25)}`,
    borderRadius: '50%',
    color: theme.bmai.palette.accent,
    padding: 0,
    position: 'relative' as 'relative',
    width: '100%',
  },
  spacer: {
    paddingBottom: '100%',
    width: '100%',
  },
  subtitle: {
    marginBottom: '-0.8rem',
    paddingTop: '0.5rem',
  },
  title: {
    color: fade('#fff', 0.8),
    fontWeight: 200 as 200,
  },
})

const RoundButton = props => {
  const { classes, isDiasabled, onClick, title, subtitle } = props
  return (
    <ButtonBase
      focusRipple={true}
      className={cn({ [classes.root]: true, [classes.disabled]: isDiasabled })}
      disabled={isDiasabled}
      onClick={onClick}
    >
      <div className={classes.spacer} />
      <div className={classes.content}>
        <Typography className={classes.title} type="title">
          {title}
        </Typography>
        <Typography className={classes.subtitle} type="subheading">
          {subtitle}
        </Typography>
      </div>
    </ButtonBase>
  )
}

export default withStyles(styles)(RoundButton)
