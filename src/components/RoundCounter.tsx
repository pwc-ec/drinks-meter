import * as React from 'react'

import { ButtonBase, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'

import { getPartyIndexImage } from '../services/partyIndexImage'

const styles = theme => ({
  circle: {
    border: `1px solid ${fade('#fff', 0.25)}`,
    borderRadius: '50%',
    marginBottom: '2rem',
    position: 'relative' as 'relative',
  },
  headline: {
    color: fade('#fff', 0.8),
    fontSize: '1.2rem',
    textTransform: 'uppercase',
  },
  number: {
    fontSize: '4rem',
    left: '0',
    position: 'absolute' as 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },
  root: {
    color: theme.bmai.palette.accent,
    textAlign: 'center' as 'center',
    width: '100%',
  },
  spacer: {
    paddingBottom: '100%',
    width: '100%',
  },
  subheading: {
    marginBottom: '-0.8rem',
    paddingTop: '0.5rem',
    textTransform: 'uppercase',
  },
})

const PartyIndex = props => {
  const { classes, bigNumber, title, subtitle } = props
  return (
    <div className={classes.root}>
      <div className={classes.circle}>
        <Typography className={classes.number} type="title">
          {bigNumber}
        </Typography>
        <div className={classes.spacer} />
      </div>
      <Typography className={classes.headline} type="headline">
        {title}
      </Typography>
      <Typography className={classes.subheading} type="subheading">
        {subtitle}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(PartyIndex)
