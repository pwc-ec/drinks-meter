import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { reduxForm, SubmissionError } from 'redux-form'

import { suggestCompanies } from '../actions/companies'
import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import * as createEmployerMutation from '../graphql/mutations/createEmployer.gql'
import { suggestCompaniesQuery } from '../graphql/queries/suggestCompanies'

import CreateEmployerForm from '../components/CreateEmployerForm'

const form = 'createEmployer'

const handleSubmit = props => e => {
  console.debug(`${props.form}.submit`, props)

  // Uses and overrides redux-form handleSubmit.
  props.handleSubmit(createEmployer(props))()
  e.preventDefault()
}

const createEmployer = props => values => {
  // tslint:disable-next-line: no-shadowed-variable
  const { form, mutate, reset, showInfoSnackbar, showErrorSnackbar, showSuccessSnackbar, retryAttempt } = props
  const { name } = values
  console.debug(`${form}.create(${retryAttempt || ''})`, values, props)

  showInfoSnackbar(`Creating employer ${name}`)

  return mutate({
    // Note: Skip optimistic response in Info -> Success|Error flow.
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   createEmployer: {
    //     __typename: 'Employer',
    //     id: Date.now().toString(), // UTC timestamp as a temporary ID.
    //   },
    // },
    variables: values,
  })
    .then(response => {
      const { id } = response.data.createEmployer
      console.debug(`${form}.created(${retryAttempt || ''})`, id, response, values, props)

      showSuccessSnackbar(`Created employer ${name}`)

      reset(form)
    })
    .catch(error => {
      console.error(`${form}.error(${retryAttempt || ''})`, error, values, props)

      showErrorSnackbar({
        actions: {
          Retry: () => createEmployer({ ...props, retryAttempt: (retryAttempt || 0) + 1 })(values),
        },
        error,
        message: `Failed to create employer ${name}`,
      })

      if (!retryAttempt) {
        throw new SubmissionError(error)
      }
    })
}

const enhancers = [
  reduxForm({ form }),

  connect(
    ({ form: { [form]: formState } }) => ({
      name: formState && formState.values && formState.values.name,
    }),
    {
      showErrorSnackbar,
      showInfoSnackbar,
      showSuccessSnackbar,
      suggestCompanies,
    },
  ),

  suggestCompaniesQuery({ inputProp: 'name' }),

  graphql(createEmployerMutation),

  withHandlers({ handleSubmit }),
]

export default compose(...enhancers)(CreateEmployerForm)
