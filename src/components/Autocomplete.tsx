import * as highlightMatch from 'autosuggest-highlight/match'
import * as highlightParse from 'autosuggest-highlight/parse'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'

import RefreshIcon from 'material-ui-icons/Refresh'

import TimeoutTextField from './TimeoutTextField'

const decorateItem = withStyles(theme => ({
  button: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  text: {
    // color: theme.palette.common.black,
  },
}))

const itemPrimaryText = parts => {
  return parts.map((part, index) => {
    return part.highlight ? (
      <span key={'zx' + index} style={{ fontWeight: 300 }}>
        {part.text}
      </span>
    ) : (
      <strong key={'zx' + index} style={{ fontWeight: 500 }}>
        {part.text}
      </strong>
    )
  })
}

interface ISuggestionItemProps {
  classes?: any
  primaryText?: any
  query?: string
  isHighlighted?: boolean
  onClick?: (suggestion: any) => void
}

const SuggestionItem = decorateItem<ISuggestionItemProps>(props => {
  const { classes, primaryText, query, isHighlighted, onClick } = props
  const matches = highlightMatch(primaryText, query)
  const parts = highlightParse(primaryText, matches)
  return (
    <ListItem button={true} onMouseDown={onClick} classes={{ button: classes.button }}>
      <ListItemText primary={itemPrimaryText(parts)} classes={{ text: classes.text }} />
    </ListItem>
  )
})

const suggestionStyles = theme => ({
  // tslint:disable
  '@keyframes spin': {
    '0%': {
      transform: 'rotate: (0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  // tslint:enable
  container: {
    backgroundColor: theme.palette.common.white,
    marginTop: '-1rem',
    maxHeight: '25rem',
    overflowY: 'auto' as 'auto',
    position: 'absolute' as 'absolute',
    width: '15rem',
    zIndex: theme.zIndex.menu,
  },
  loading: {
    animation: 'spin 2s infinite linear',
    fill: theme.bmai.palette.lightBlack,
  },
  loadingContainer: {
    textAlign: 'center',
  },
})

interface ISuggestionListProps {
  classes?: any
  getSuggestionText?: (suggestion: any) => string
  loading?: boolean
  query?: string
  onSelected?: (suggestion: any) => void
  suggestions?: any[]
}

const SuggestionList = withStyles(suggestionStyles)((props: ISuggestionListProps) => {
  const { classes, loading, getSuggestionText, query, onSelected, suggestions } = props
  const items = suggestions.map((item, i) => (
    // tslint:disable
    <SuggestionItem
      key={'acsi' + i}
      query={query || ' '}
      primaryText={getSuggestionText(item)}
      onClick={() => onSelected(item)}
    />
    // tslint:enable
  ))

  return (
    <Paper elevation={4} className={classes.container} square={true}>
      {items.length ? (
        <List>{items}</List>
      ) : loading ? (
        <div className={classes.loadingContainer}>
          <RefreshIcon className={classes.loading} rotate="true" />
        </div>
      ) : null}
    </Paper>
  )
})

///////////////////////////////////////

const styles = theme => ({
  suggestions: {
    background: theme.palette.common.white,
  },
})

interface IAutocompleteProps {
  autoFocus?: boolean
  className?: any
  disabled?: boolean
  getSuggestionText?: (suggestion: any) => string
  helperText?: string
  helperTextClassName?: string
  inputClassName?: string
  label?: string
  labelClassName?: string
  loading?: boolean
  getSuggestions?: (value: any) => void
  onSelected?: (suggestion: any) => void
  suggestions: any[]
  timeout?: number
}

interface IAutocompleteState {
  inputEl: any

  query: any
  showSuggestions: boolean
}

class Autocomplete extends React.Component<IAutocompleteProps, IAutocompleteState> {
  constructor(props) {
    super(props)
    this.state = {
      inputEl: null,
      query: null,
      showSuggestions: false,
    }
  }

  public render() {
    const {
      autoFocus,
      className,
      disabled,
      getSuggestionText,
      helperText,
      helperTextClassName,
      inputClassName,
      label,
      labelClassName,
      loading,
      suggestions,
    } = this.props

    const { showSuggestions } = this.state

    return (
      <Grid direction="column" container={true}>
        <Grid item={true}>
          <TimeoutTextField
            autoFocus={autoFocus}
            className={className}
            disabled={disabled}
            helperText={helperText}
            helperTextClassName={helperTextClassName}
            inputClassName={inputClassName}
            label={label}
            labelClassName={labelClassName}
            onBlur={this.handleClose}
            onChange={this.handleChange}
            type="search"
          />
        </Grid>
        <Grid item={true}>
          {showSuggestions ? (
            <SuggestionList
              getSuggestionText={getSuggestionText}
              loading={loading}
              onSelected={this.handleSelected}
              query={this.state.query}
              suggestions={suggestions || []}
            />
          ) : null}
        </Grid>
      </Grid>
    )
  }

  private handleClose = () => {
    this.setState({ showSuggestions: false })
  }

  private handleChange = (value, elementRef) => {
    this.setState({
      inputEl: elementRef,
      query: value,
      showSuggestions: true,
    })

    if (this.props.getSuggestions) {
      this.props.getSuggestions(value)
    }
  }

  private handleSelected = suggestion => {
    const { getSuggestionText } = this.props

    this.setState({
      query: getSuggestionText && getSuggestionText(suggestion),
      showSuggestions: false,
    })

    if (this.props.onSelected) {
      this.props.onSelected(suggestion)
    }
  }
}

export default withStyles(styles)(Autocomplete)
