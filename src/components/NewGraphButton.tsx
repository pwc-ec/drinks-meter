import * as React from 'react'

import * as cn from 'classnames'

import { withStyles } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import InsertChartIcon from 'material-ui-icons/InsertChart'
import ButtonBase from 'material-ui/ButtonBase'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  icon: {
    color: theme.bmai.buttonFloating.color,
    height: '6.25rem',
    width: '6.25rem',
  },
  label: {
    alignItems: 'center' as 'center',
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  labelIcon: {
    color: theme.bmai.buttonFloating.color,
    marginTop: '-0.1rem',
  },
  labelText: {
    color: theme.bmai.buttonFloating.color,
    fontSize: '1.25rem',
    textTransform: 'capitalize',
  },
  root: {
    '&:hover': {
      backgroundColor: theme.bmai.buttonFloating.hoverBackground,
      borderColor: theme.bmai.buttonFloating.hoverBackground,
    },
    '&:hover $icon, &:hover $labelIcon, &:hover $labelText': {
      color: theme.bmai.buttonFloating.hoverColor,
    },
    backgroundColor: theme.bmai.buttonFloating.background,
    border: `1px solid ${theme.bmai.buttonFloating.background}`,
    boxShadow: theme.shadows[0],
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: theme.bmai.padding.size,
    width: '100%',
  },
  simple: {
    '& $icon': {
      display: 'none',
    },
    '& $labelText': {
      fontSize: '1rem',
    },
    padding: 12,
  },
})

export interface INewGraphButton {
  classes?: any
  onClick?: (e) => void
  simple?: boolean
}

const NewGraphButton: React.SFC<INewGraphButton> = ({ classes, onClick, simple = false }) => (
  <ButtonBase className={cn({ [classes.root]: true, [classes.simple]: simple })} onClick={onClick}>
    <InsertChartIcon className={classes.icon} />
    <div className={classes.label}>
      <AddIcon className={classes.labelIcon} />
      <div className={classes.labelText}>new graph</div>
    </div>
  </ButtonBase>
)

export default withStyles(styles)(NewGraphButton)
