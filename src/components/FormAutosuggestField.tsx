import * as match from 'autosuggest-highlight/match'
import * as parse from 'autosuggest-highlight/parse'
import { noop } from 'lodash'
import { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import * as Autosuggest from 'react-autosuggest'
import { compose, withHandlers } from 'recompose'

import { disableEnter } from '../services/handlers'
import Componentize from './Componentize'

const styles = ({ bmai: { autosuggest } }) => ({ ...autosuggest })
const suggestionStyle = { fontSize: '1.6rem', fontWeight: 300 as 300 }
const suggestionStrongStyle = { fontWeight: 500 as 500 }

const defaultInputProps = {
  autoComplete: 'off',
}

const defaultRenderInput = props => <Componentize Component={TextField} {...props} />

// Note: Only beginnings of words are currently highlighted.
// See: https://github.com/moroshko/autosuggest-highlight/issues/5
const defaultRenderHighlightPart = (part, index) =>
  part.highlight ? (
    <span key={index}>{part.text}</span>
  ) : (
    <strong key={index} style={suggestionStrongStyle}>
      {part.text}
    </strong>
  )

const defaultRenderSuggestion = ({ getSuggestionValue, renderHighlightPart }) => (
  suggestion,
  { query, isHighlighted },
) => {
  const value = getSuggestionValue(suggestion)
  const matches = match(value, query)
  const parts = parse(value, matches)
  // console.debug('suggestions.render.item', value, { query, matches, parts }))

  return (
    <MenuItem selected={isHighlighted} style={suggestionStyle} component="div">
      <div>{parts.map(renderHighlightPart || defaultRenderHighlightPart)}</div>
    </MenuItem>
  )
}

const defaultRenderSuggestionsContainer = ({ containerProps, children }) => (
  <Paper {...containerProps} square={true}>
    {children}
  </Paper>
)

const defaultOnSuggestionSelected = props => (e, { suggestionValue }) => props.input.onChange(suggestionValue)

const FormAutosuggestField = props => {
  const {
    alwaysRenderSuggestions,
    classes,
    // tslint:disable-next-line: no-shadowed-variable
    defaultOnSuggestionSelected,
    // tslint:disable-next-line: no-shadowed-variable
    defaultRenderSuggestion,
    focusInputOnSuggestionClick,
    getSuggestionValue,
    highlightFirstSuggestion,
    id,
    input,
    onSuggestionSelected,
    renderInput,
    renderSuggestion,
    renderSuggestionsContainer,
    // tslint:disable-next-line: no-shadowed-variable
    shouldRenderSuggestions,
    suggestions,
    ...customProps,
  } = props

  const inputProps = { ...defaultInputProps, ...customProps, ...input }
  const { meta: { error, touched, active } } = props

  inputProps.helperText = inputProps.helperText || (touched && error) || null

  if (suggestions && suggestions.length) {
    // Disable submitting form with Enter if suggestions are displayed.
    inputProps.onKeyDown = disableEnter(inputProps.onKeyDown)
  }

  console.debug(`form(${props.meta.form}).suggest{${id}}(${input.name})[${props.type}]`, input.value, props, inputProps)

  return (
    <Autosuggest
      id={id}
      theme={classes}
      suggestions={suggestions}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={onSuggestionSelected || defaultOnSuggestionSelected}
      onSuggestionsFetchRequested={noop}
      onSuggestionsClearRequested={noop}
      inputProps={inputProps}
      renderInputComponent={renderInput || defaultRenderInput}
      renderSuggestion={renderSuggestion || defaultRenderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer || defaultRenderSuggestionsContainer}
      alwaysRenderSuggestions={alwaysRenderSuggestions}
      shouldRenderSuggestions={shouldRenderSuggestions}
      focusInputOnSuggestionClick={focusInputOnSuggestionClick}
      highlightFirstSuggestion={highlightFirstSuggestion}
    />
  )
}

const enhancers = [withHandlers({ defaultOnSuggestionSelected, defaultRenderSuggestion }), withStyles(styles)]

export default compose(...enhancers)(FormAutosuggestField)
