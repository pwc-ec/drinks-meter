import Grid from 'material-ui/Grid'
import * as React from 'react'
import Joyride from 'react-joyride'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

import Autocomplete from './Autocomplete'
import ButtonWithTooltip from './ButtonWithTooltip'
import Square from './Square'

import '../img/buildings.jpg'

// ------------------------------------------------------------------------------------------------

const initials = (name: string): string => {
  let result = ''
  if (name) {
    const parts = name.split(/[\s,-/&/_/|]+/gi)
    parts.forEach((p, i) => {
      result += p[0].toLocaleUpperCase()
    })
    if (parts.length === 1 && parts[0].length > 1) {
      result += parts[0][1].toLocaleUpperCase()
    }
  }
  return result
}

// ------------------------------------------------------------------------------------------------

interface ICompaniesProps {
  classes?: any
  className?: string
  companies: ICompany[]
  deselectCompany: (company: ICompany) => void
  getSuggestedCompanyName: (company: ICompany) => string
}

// ------------------------------------------------------------------------------------------------

const styles = theme => ({
  item: {
    paddingRight: '1.5rem!important',
    paddingTop: '1.6rem',
  },
  noData: {
    paddingTop: theme.bmai.padding.size,
  },
})

const Companies = withStyles(styles)<ICompaniesProps>(
  ({ companies = [], classes, className, deselectCompany, getSuggestedCompanyName }) => {
    const list = companies.map((company, i) => (
      <Grid key={'cli' + i} className={classes.item} item={true}>
        <Square
          logo={company.logo}
          placeholder={initials(company.name)}
          title={getSuggestedCompanyName(company)}
          onRemove={() => deselectCompany(company)}
        />
      </Grid>
    ))

    return (
      <Grid
        alignContent="space-between"
        className={className}
        container={true}
        direction="row"
        justify="flex-start"
        spacing={0}
        wrap="wrap"
      >
        {list.length ? (
          list
        ) : (
          <Typography type="title" className={classes.noData}>
            No company selected
          </Typography>
        )}
      </Grid>
    )
  },
)
// ------------------------------------------------------------------------------------------------

const pageStyles = theme => ({
  createReport: {
    padding: theme.bmai.padding.size,
  },
  navigation: {
    padding: theme.bmai.padding.size,
  },
  root: {
    height: 'inherit',
  },
  searchHeadline: {
    color: theme.bmai.palette.contrast,
    fontStyle: 'italic' as 'italic',
    textTransform: 'uppercase',
  },
  searchInput: {
    color: theme.bmai.palette.contrast,
  },
  searchInputHelper: {
    color: theme.bmai.palette.contrast,
  },
  searchInputInput: {
    '&:after': {
      backgroundColor: theme.bmai.palette.contrast,
    },
    color: theme.bmai.palette.contrast,
  },
  searchInputLabel: {
    color: theme.bmai.palette.contrast,
  },
  searchInputRoot: {
    color: theme.bmai.palette.contrast,
    fontSize: '1.5rem',
    marginTop: `calc(${theme.bmai.padding.size} / 2)`,
    width: '50%',
  },
  searchResult: {
    background: 'rgba(255,255,255,0.9)',
    padding: theme.bmai.padding.size,
  },
  searchSection: {
    background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url("/img/buildings.jpg")', // make background darker to better readibility
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    height: `calc(40% - ${theme.bmai.padding.size} * 4)`,
    minHeight: `calc(11rem - ${theme.bmai.padding.size} * 4)`,
    paddingBottom: `calc(${theme.bmai.padding.size} * 2)`,
    paddingLeft: theme.bmai.padding.size,
    paddingRight: theme.bmai.padding.size,
    paddingTop: `10%`,
  },
})

export interface ICreateReportPageProps {
  classes: any
  createReport: () => Promise<IReport | any>
  suggestedCompanies?: ICompany[]
  suggestedCompaniesInput: string
  suggestedCompaniesError?: any
  suggestedCompaniesLoading?: boolean
  getSuggestedCompanyName?: (company: ICompany) => string
  onCreateReport: any
  deselectCompany: (company: ICompany) => void
  suggestCompanies: (value) => void
  onNextPage: () => void
  selectCompany: (company: ICompany) => void
  showErrorSnackbar: (snackbar: string | ISnackbar) => void
  query: any
  saving: boolean
  selectedCompanies: ICompany[]
  updateUserLastReport: any
  userCompany: ICompany
  showJoyride: boolean
}

interface ICreateReportState {
  companies: ICompany[]
  saving: boolean
}

class CreateReportPage extends React.Component<ICreateReportPageProps, ICreateReportState> {
  private steps: any[]

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      saving: false,
    }

    this.steps = [
      {
        selector: 'input[type="search"]',
        text: 'Type here first few letter of some company.',
        title: 'Next step',
      },
      {
        selector: 'main article div:nth-child(4) button',
        text: 'Click here to create report',
        title: 'Next step',
      },
    ]
  }

  public componentDidMount() {
    const { selectCompany, selectedCompanies, userCompany } = this.props
    if (userCompany && selectedCompanies.every(c => c.id !== userCompany.id)) {
      selectCompany(userCompany)
    }
  }

  public render() {
    const {
      classes,
      suggestCompanies,
      suggestedCompanies,
      suggestedCompaniesError,
      suggestedCompaniesLoading,
      getSuggestedCompanyName,
      deselectCompany,
      selectCompany,
      selectedCompanies,
      showJoyride,
    } = this.props

    const { saving } = this.state

    return (
      <article className={classes.root}>
        <Joyride
          debug={true}
          run={showJoyride}
          autoStart={true}
          showSkipButton={true}
          showStepsProgress={true}
          steps={this.steps}
          allowClicksThruHole={true}
          type="continuous"
          showOverlay={false}
        />
        <div className={classes.searchSection}>
          <Typography type="display3" className={classes.searchHeadline}>
            Select your company
          </Typography>
          <Autocomplete
            autoFocus={true}
            className={classes.searchInputRoot}
            disabled={suggestedCompaniesError}
            helperText={''}
            inputClassName={classes.searchInputInput}
            label="SEARCH A COMPANY"
            labelClassName={classes.searchInputLabel}
            loading={suggestedCompaniesLoading}
            suggestions={suggestedCompanies}
            getSuggestionText={getSuggestedCompanyName}
            getSuggestions={suggestCompanies}
            onSelected={selectCompany}
          />
        </div>
        <Companies
          companies={selectedCompanies}
          className={classes.searchResult}
          deselectCompany={deselectCompany}
          getSuggestedCompanyName={getSuggestedCompanyName}
        />
        <ButtonWithTooltip
          ariaLabel="create report"
          classes={{ root: classes.createReport }}
          disabled={selectedCompanies.length === 0 || saving}
          onClick={this.handleCreateReport}
          tooltip={
            selectedCompanies.length
              ? `Click to create a new report named "${selectedCompanies.map(c => c.name).join(' | ')}"`
              : 'Select a company first and then click to create a new report'
          }
          tooltipPlacement="right"
        >
          Create New report
        </ButtonWithTooltip>
      </article>
    )
  }

  private handleCreateReport = () => {
    if (this.props.onCreateReport) {
      this.setState({ saving: true })
      this.props.onCreateReport(this.props.selectedCompanies, () => this.setState({ saving: false }))
    }
  }
}

export default withStyles(pageStyles)(CreateReportPage)
