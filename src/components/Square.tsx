import * as React from 'react'

import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import Clear from 'material-ui-icons/Clear'

const styles = theme => ({
  header: {
    paddingBottom: '0.5rem',
  },
  logo: {
    border: 0,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '4rem',
    fontWeight: theme.typography.fontWeightMedium,
    maxHeight: '100%',
    maxWidth: '100%',
    outline: 0,
    verticalAlign: 'middle',
  },
  logoFrame: {
    border: `0.6rem solid ${theme.bmai.palette.faintGrey}`,
    height: '8.125rem',
    padding: '1.5rem',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '8.125rem',
  },
  logoHelper: {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle',
  },
  removeButton: {
    height: '1.5rem',
    width: '1rem',
  },
  root: {
    backgroundColor: theme.palette.common.white,
  },
})

interface ISqaureProps {
  className?: string
  classes?: any
  logo?: string
  onRemove?: () => void
  placeholder?: string
  removeHint?: string
  title: string
}

const Square: React.SFC<ISqaureProps> = ({
  className,
  classes,
  title,
  logo,
  placeholder,
  removeHint = 'Click to remove',
  onRemove,
}) => (
  <div className={className}>
    <Grid
      className={classes.header}
      direction="row"
      alignContent="space-between"
      container={true}
      alignItems="center"
      justify="space-between"
      wrap="nowrap"
    >
      <Grid item={true}>
        <Typography type="title">{title}</Typography>
      </Grid>
      <Grid item={true}>
        <IconButton
          color="primary"
          className={classes.removeButton}
          title={removeHint}
          aria-label={removeHint}
          onClick={onRemove}
        >
          <Clear />
        </IconButton>
      </Grid>
    </Grid>
    <Grid className={classes.logoFrame}>
      <span className={classes.logoHelper} />
      <img className={classes.logo} alt={placeholder} src={logo} />
    </Grid>
  </div>
)

export default withStyles(styles)(Square)
