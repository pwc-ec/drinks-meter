import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import * as React from 'react'

import TimeoutTextField from './TimeoutTextField'

export interface ISelectKpiModalProps {
  allKpis: IKpi[]
  classes: any
  onClose: (values: IKpi[]) => void
  open: boolean
  selectedKpis: IKpi[]
  unit: string
}

interface ISelectKpiModalState {
  allKpis: IKpi[]
  query: string
  values: IKpi[]
}

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  actions: {
    '& button:not(:first-child)': {
      marginLeft: theme.bmai.dialog.buttonSpaceBetween,
    },
    justifyContent: 'space-between' as 'space-between',
    paddingBottom: '1rem',
    paddingLeft: '2rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
  },
  dialog: {
    height: theme.bmai.dialog.height,
    width: 600,
  },
  filter: {
    marginRight: 24,
    marginTop: -10,
    width: '25%',
  },
  item: {
    paddingBottom: '0.5rem',
    paddingLeft: 0,
    paddingTop: '0.5rem',
  },
  selectionInfo: {
    color: theme.palette.grey['500'],
  },
  title: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'space-between' as 'space-between',
  },
})

// ------------------------------------------------------------------------------------------------

class SelectKpiModal extends React.Component<ISelectKpiModalProps, ISelectKpiModalState> {
  constructor(props) {
    super(props)
    this.state = {
      allKpis: [],
      query: null,
      values: [],
    }
  }

  public componentWillMount() {
    this.setState({ allKpis: this.props.allKpis || [] })
  }

  public componentWillUpdate(nextProps) {
    if (nextProps.allKpis !== this.props.allKpis) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ allKpis: nextProps.allKpis || [] })
    }
  }

  public render() {
    const { allKpis: companiesKpis, classes, open, selectedKpis = [] } = this.props
    const { allKpis, values } = this.state

    const usedUnits = selectedKpis.concat(values).reduce((units, kpi) => {
      if (!units.includes(kpi.unit)) {
        units.push(kpi.unit)
      }
      return units
    }, [])

    let filteredKpis = allKpis
    if (usedUnits.length === 2) {
      filteredKpis = allKpis.filter(kpi => usedUnits.includes(kpi.unit))
    }

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        ignoreBackdropClick={true}
        ignoreEscapeKeyUp={false}
        maxWidth="md"
        open={open}
      >
        <DialogTitle disableTypography={true}>
          <div className={classes.title}>
            <Typography type="headline">KPI Selection</Typography>
            <TimeoutTextField
              autoFocus={false}
              className={classes.filter}
              helperText={''}
              helperTextClassName={classes.filter}
              label="Filter KPIs"
              onChange={this.handleFilterChange}
              type="search"
              defaultValue={''}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={classes.content}>
            <List dense={false}>
              {filteredKpis.map(kpi => (
                <ListItem
                  aria-controls="kpi-selection"
                  aria-haspopup="true"
                  aria-label="KPI"
                  button={true}
                  className={classes.item}
                  disabled={!!selectedKpis.find(k => k.id === kpi.id)}
                  divider={true}
                  key={kpi.id}
                  onClick={() => this.handleClickListItem(kpi)}
                >
                  <Checkbox
                    checked={values.includes(kpi) || !!selectedKpis.find(k => k.id === kpi.id)}
                    disableRipple={true}
                    tabIndex={-1}
                  />
                  <ListItemText primary={kpi.name} />
                  <Typography type="subheading">{kpi.unit}</Typography>
                </ListItem>
              ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Typography className={classes.selectionInfo} type="body1">
            {`Selected ${values.length} of ${allKpis.length} KPI(s) for addition to graph`}
          </Typography>
          <div>
            <Button onClick={this.handleCancel} color="default">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="accent">
              OK
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }

  private handleCancel = () => {
    this.setState({ values: [] })
    this.props.onClose(null)
  }

  private handleClickListItem = kpi => {
    const { values } = this.state
    const isChecked = values.includes(kpi)
    const newValues = isChecked ? values.filter(v => v !== kpi) : [...values, kpi]
    this.setState({ values: newValues })
  }

  private handleFilterChange = query => {
    const { allKpis } = this.props
    if (!query) {
      this.setState({ allKpis })
    } else {
      query = query.toLowerCase().trim()
      const kpis = allKpis.filter(c => c.name.toLocaleLowerCase().includes(query))
      this.setState({ allKpis: kpis })
    }
  }

  private handleOk = () => {
    this.setState({ values: [] })
    if (this.props.onClose) {
      this.props.onClose(this.state.values)
    }
  }
}

export default withStyles(styles)(SelectKpiModal)
