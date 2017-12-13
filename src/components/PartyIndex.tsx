import * as React from 'react'

import { ButtonBase, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'

import { getPartyIndexImage } from '../services/partyIndexImage'

const styles = theme => ({
  index: {
    background: theme.bmai.palette.accent,
    borderRadius: '50%',
    fontSize: '6rem',
    height: '1.5em',
    left: '-1rem',
    lineHeight: '1.5em',
    position: 'absolute' as 'absolute',
    textAlign: 'center',
    top: '-1rem',
    width: '1.5em',
  },
  root: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    border: `1px solid ${fade('#fff', 0.25)}`,
    borderRadius: '50%',
    color: theme.bmai.palette.accent,
    height: '40vh',
    padding: 0,
    position: 'relative' as 'relative',
    width: '40vh',
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

const PartyIndex = props => {
  const { classes, event, index } = props
  return (
    <div className={classes.root} style={{ backgroundImage: `url(${getPartyIndexImage(event.url, index)})` }}>
      <Typography className={classes.index} type="title">
        {index}
      </Typography>
      <div className={classes.spacer} />
    </div>
  )
}

export default withStyles(styles)(PartyIndex)
