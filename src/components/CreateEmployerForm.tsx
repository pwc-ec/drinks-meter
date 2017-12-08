import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'
import { Field } from 'redux-form'
import { required } from 'redux-form-validators'

import FormAutosuggestField from './FormAutosuggestField'

const styles = theme => {
  const { bmai: { form: { form } }, mixins: { gutters } } = theme
  // console.debug('form.theme', { form, form2: gutters(form), theme })
  return { form: gutters(form) }
}

const CreateEmployerForm = props => {
  const {
    classes,
    getSuggestedCompanyName,
    handleSubmit,
    invalid,
    submitting,
    suggestedCompanies,
    // suggestedCompaniesLoading,
    // suggestedCompaniesError,
  } = props

  console.debug(`form(${props.form}).render`, props.name, props)

  // const disabled = !!suggestedCompaniesError || !!suggestedCompaniesLoading

  return (
    <Paper className={classes.form} elevation={4}>
      <form onSubmit={handleSubmit}>
        <Grid direction="column" container={true}>
          <Grid item={true}>
            <Field
              name="name"
              label="Employer name"
              type="text"
              validate={[required()]}
              required={true}
              component={FormAutosuggestField}
              suggestions={suggestedCompanies}
              getSuggestionValue={getSuggestedCompanyName}
              highlightFirstSuggestion={true}
              fullWidth={true}
            />
          </Grid>
          <p />
          <Grid item={true}>
            <Button raised={true} disabled={invalid || submitting} type="submit" color="primary">
              Create employer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default withStyles(styles)(CreateEmployerForm)
