import * as React from 'react'

import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { FormControlLabel } from 'material-ui/Form'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'

import TimeoutTextField from './TimeoutTextField'

// ------------------------------------------------------------------------------------------------

export interface ISubscribeModalProps {
  allCompanies: ICompany[]
  classes?: any
  companiesReportsCount: any
  onClose: (companies: ICompany[]) => void
  open: boolean
  subscribedCompaniesIds: string[]
  unit: string
}

interface ISubscribeModalState {
  companies: ICompany[]
  onlyUsed: boolean
  query: string
  values: ICompany[]
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
  bar: {
    paddingTop: '1rem',
  },
  dialog: {
    height: theme.bmai.dialog.height,
    minWidth: '25rem',
  },
  filter: {
    marginTop: '-0.6rem',
    paddingRight: '1.2rem',
    width: '10rem',
  },
  selectionInfo: {
    color: theme.palette.grey['500'],
  },
  showOnly: {
    paddingLeft: '0.9rem',
  },
})

// ------------------------------------------------------------------------------------------------

class SubscribeModal extends React.Component<ISubscribeModalProps, ISubscribeModalState> {
  private list = null

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      onlyUsed: false,
      query: null,
      values: [],
    }
  }

  public componentWillReceiveProps(nextProps) {
    const { allCompanies, subscribedCompaniesIds } = nextProps
    if (allCompanies !== this.props.allCompanies) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ companies: allCompanies, query: null })
    }
    if (subscribedCompaniesIds !== this.props.subscribedCompaniesIds) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ values: allCompanies.filter(c => subscribedCompaniesIds.includes(c.id)) })
    }
  }

  public render() {
    const { companiesReportsCount, classes, open } = this.props
    const { companies, values } = this.state

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        ignoreBackdropClick={true}
        ignoreEscapeKeyUp={false}
        maxWidth="md"
        open={open}
      >
        <DialogTitle disableTypography={true}>
          <Typography type="headline">Subscribe to companies data change notifications</Typography>
          <Grid className={classes.bar} container={true} justify="space-between" spacing={16}>
            <Grid item={true}>
              <FormControlLabel
                className={classes.showOnly}
                control={<Checkbox checked={this.state.onlyUsed} onChange={this.handleShowOnly} />}
                label="Show only companies used in reports"
              />
            </Grid>
            <Grid item={true}>
              <TimeoutTextField
                autoFocus={false}
                className={classes.filter}
                helperText={''}
                helperTextClassName={classes.filter}
                label="Filter companies"
                onChange={this.handleFilterChange}
                type="search"
                defaultValue={this.state.query}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <List className={classes.list} dense={false}>
            {companies.map(company => (
              <ListItem
                aria-controls="company-selection"
                aria-haspopup="true"
                aria-label="Company"
                button={true}
                divider={true}
                key={company.id}
                onClick={() => this.handleClickListItem(company)}
              >
                <ListItemText
                  primary={company.name}
                  secondary={
                    companiesReportsCount[company.id] ? `Used in ${companiesReportsCount[company.id]} report(s)` : '-' // 'Not used in any report'
                  }
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={values.includes(company)}
                    disableRipple={true}
                    onChange={() => this.handleClickListItem(company)}
                    tabIndex={-1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Typography className={classes.selectionInfo} type="body1">
            {`Selected ${values.length} companies`}
          </Typography>
          <div>
            <Button onClick={this.handleCancel} color="default">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="accent">
              Ok
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }

  private handleCancel = () => {
    this.props.onClose(null)
  }

  private handleClickListItem = company => {
    const { values } = this.state
    const isChecked = values.includes(company)
    const newValues = isChecked ? values.filter(v => v !== company) : [...values, company]
    this.setState({ values: newValues })
  }

  private handleFilterChange = query => {
    const companies = this.filterCompanies(query, this.state.onlyUsed)
    this.setState({ companies, query })
  }

  private handleOk = () => {
    if (this.props.onClose) {
      this.props.onClose(this.state.values)
    }
  }

  private handleShowOnly = () => {
    const onlyUsed = !this.state.onlyUsed
    const companies = this.filterCompanies(this.state.query, onlyUsed)
    this.setState({ companies, onlyUsed })
  }

  private filterCompanies = (query: string, onlyUsed: boolean): ICompany[] => {
    const { allCompanies, companiesReportsCount } = this.props
    let companies = allCompanies

    if (query) {
      query = query.toLowerCase().trim()
      companies = allCompanies.filter(c => c.name.toLocaleLowerCase().includes(query))
    }

    if (onlyUsed) {
      companies = companies.filter(c => companiesReportsCount[c.id])
    }

    return companies
  }
}

export default withStyles(styles)(SubscribeModal)
