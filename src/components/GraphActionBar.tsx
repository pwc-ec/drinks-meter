import * as React from 'react'

import * as cn from 'classnames'

import DeleteForeverIcon from 'material-ui-icons/DeleteForever'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import PhotoIcon from 'material-ui-icons/Photo'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import Tooltip from 'material-ui/Tooltip'

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  button: {
    boxShadow: 'none',
    height: theme.bmai.buttonFloating.regularSize,
    marginLeft: theme.bmai.buttonFloating.marginLeft,
    width: theme.bmai.buttonFloating.regularSize,
  },
  label: {
    display: 'inline-block',
    verticalAlign: 'super',
  },
  switch: {
    '& > .label': {
      '&.active': {
        color: theme.bmai.palette.primary,
      },
      '&.left': {
        marginRight: '-0.25rem',
      },
      '&.right': {
        marginLeft: '-0.25rem',
        marginRight: '0.5rem',
      },
      fontFamily: theme.typography.fontFamily,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      verticalAlign: 'super',
    },
    '& > div': {
      display: 'inline-block',
    },
    display: 'inline-block',
  },
})

// ------------------------------------------------------------------------------------------------

export interface IGraphActionBar {
  className?: any
  classes?: any
  onDelete?: () => void
  onImageDownload?: () => void
  relative?: boolean
  onToggleRelative?: () => void
  xlsxDownloadUrl: string
}

// ------------------------------------------------------------------------------------------------

const GraphActionBar: React.SFC<IGraphActionBar> = ({
  className,
  classes,
  onDelete,
  onImageDownload,
  onToggleRelative,
  relative,
  xlsxDownloadUrl,
}) => (
  <div className={className}>
    <div className={classes.switch}>
      <div className={cn('label', 'left', { active: !relative })}>absolute</div>
      <Switch
        checked={relative}
        classes={{
          bar: classes.switchBar,
          checked: classes.switchChecked,
        }}
        onChange={onToggleRelative}
      />
      <div className={cn('label', 'right', { active: relative })}>relative</div>
    </div>
    <Tooltip title="Export all report data to MS Excel">
      <a href={xlsxDownloadUrl} download={true}>
        <Button className={classes.button} color="primary" aria-label="Donwnload excel" fab={true} raised={false}>
          <FileDownloadIcon />
        </Button>
      </a>
    </Tooltip>
    <Tooltip title="Export graph to image">
      <Button
        className={classes.button}
        fab={true}
        color="primary"
        aria-label="Download image"
        onClick={onImageDownload}
        raised={false}
      >
        <PhotoIcon />
      </Button>
    </Tooltip>
    <Tooltip title="Delete graph">
      <Button
        className={classes.button}
        color="accent"
        aria-label="Delete graph"
        fab={true}
        onClick={onDelete}
        raised={false}
      >
        <DeleteForeverIcon />
      </Button>
    </Tooltip>
  </div>
)

export default withStyles(styles)(GraphActionBar)
