import * as React from 'react'

import * as cn from 'classnames'

import { formatDate } from '../services/format'

import {
  Avatar,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Radio,
  Tooltip,
  Typography,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import DeleteForeverIcon from 'material-ui-icons/DeleteForever'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import RefreshIcon from 'material-ui-icons/Refresh'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.common.transparent,
    marginRight: '-1rem',
  },
  chipCreate: {
    '&:focus, &:hover': {
      backgroundColor: theme.palette.background.appBar,
      // border: `1px solid ${theme.bmai.palette.contrast}`,
    },
    backgroundColor: theme.palette.common.transparent,
    border: `1px solid ${theme.palette.background.appBar}`,
    color: theme.bmai.palette.contrast,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  chipList: {
    '& > svg': {
      color: theme.bmai.palette.primary,
    },
    '&:focus, &:hover': {
      '& > svg': {
        color: theme.bmai.palette.accent,
      },
      backgroundColor: theme.bmai.palette.contrast,
      border: `1px solid ${theme.bmai.palette.contrast}`,
      color: theme.bmai.palette.black,
    },
    backgroundColor: theme.bmai.palette.contrast,
    border: `1px solid ${theme.palette.background.appBar}`,
    color: theme.bmai.palette.black,
    cursor: 'pointer',
    fontSize: '1rem',
    height: '28px',
    marginTop: '0.2rem',
    width: '10rem',
  },
  container: {
    left: 'calc(50% - 14rem)',
    maxHeight: '70vh',
    overflowY: 'auto' as 'auto',
    position: 'absolute' as 'absolute',
    top: theme.bmai.menu.top,
    width: '25rem',
    zIndex: theme.zIndex.appBar,
  },
  itemActive: {
    '& h3, p, + div button': {
      color: theme.bmai.palette.tertiaryActive,
    },
  },
  itemDelete: {
    '&:hover': {
      color: theme.bmai.palette.accent,
    },
    color: theme.bmai.buttonFloating.background,
  },
  list: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    overflowY: 'auto' as 'auto',
  },
})

export interface IReportMenuProps {
  activeReportId: string
  classes?: any
  hide: () => void
  loading: boolean
  onCreate: () => void
  onDelete: (report: IReport) => void
  onSelect: (report: IReport) => void
  open: boolean
  reports?: IReport[]
  toggleOpen: () => void
}

const ReportMenu: React.SFC<IReportMenuProps> = ({
  activeReportId,
  classes,
  hide,
  loading,
  onCreate,
  onDelete,
  onSelect,
  open,
  reports,
  toggleOpen,
}) => (
  <div onBlur={hide}>
    <Grid container={true} direction="row" spacing={0} alignContent="space-between">
      <Grid item={true}>
        <Chip
          label={`Reports`}
          className={classes.chipList}
          deleteIcon={<KeyboardArrowDownIcon />}
          onClick={toggleOpen}
          onRequestDelete={toggleOpen}
        />
      </Grid>
      <Grid item={true}>
        <Chip
          label="Create new Report"
          className={classes.chipCreate}
          avatar={
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
          }
          onClick={onCreate}
        />
      </Grid>
    </Grid>
    {open ? (
      <Paper elevation={6} className={classes.container}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <RefreshIcon className={classes.loading} rotate="true" />
          </div>
        ) : (
          <List className={classes.list} dense={false}>
            <ListSubheader>{`Reports (${reports.length})`}</ListSubheader>
            {reports.length ? (
              reports.map((report, i) => (
                <ListItem
                  aria-controls="report-selection"
                  aria-haspopup="true"
                  aria-label="reports"
                  button={true}
                  className={cn({ [classes.item]: true, [classes.itemActive]: activeReportId === report.id })}
                  divider={true}
                  key={report.id}
                  onClick={() => onSelect(report)}
                >
                  <ListItemText
                    primary={report.name}
                    secondary={`${formatDate(report.updatedAt)} - contains ${report.graphs.length} graph(s)`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete Report"
                      className={classes.itemDelete}
                      onClick={() => onDelete(report)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <ListItem button={false}>
                <ListItemText primary="No reports have been created so far" />
              </ListItem>
            )}
          </List>
        )}
      </Paper>
    ) : null}
  </div>
)

export default withStyles(styles)(ReportMenu)
