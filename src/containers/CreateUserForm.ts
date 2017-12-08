import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'
import { reduxForm, SubmissionError } from 'redux-form'
import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import * as createUserMutation from '../graphql/mutations/createUser.gql'
import * as getEmployers from '../graphql/queries/getEmployers.gql'

import CreateUserForm from '../components/CreateUserForm'
import { routeAdminUsers } from '../constants/routes'

const handleSubmit = props => e => {
  console.debug(`${props.form}.submit`, props)

  // Uses and overrides redux-form handleSubmit.
  props.handleSubmit(createUser(props))()
  e.preventDefault()
}

const defaultValues = {
  isAdmin: false,
}

const createUser = props => values => {
  // tslint:disable-next-line: no-shadowed-variable
  const { close, form, mutate, reset, showInfoSnackbar, showErrorSnackbar, showSuccessSnackbar, retryAttempt } = props
  const { fullname } = values
  console.debug(`${form}.create(${retryAttempt || ''})`, values, props)

  showInfoSnackbar(`Creating user ${fullname}`)

  return mutate({
    // Note: Skip optimistic response in Info -> Success|Error flow.
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   createUser: {
    //     __typename: 'User',
    //     id: Date.now().toString(), // UTC timestamp as a temporary ID.
    //   },
    // },
    variables: { ...defaultValues, ...values },
  })
    .then(response => {
      const { id } = response.data.createUser
      console.debug(`${form}.created(${retryAttempt || ''})`, id, response, values, props)

      showSuccessSnackbar(`Created user ${fullname}`)

      reset(form)
      close()
    })
    .catch(error => {
      console.error(`${form}.error(${retryAttempt || ''})`, error, values, props)

      showErrorSnackbar({
        actions: {
          Retry: () => createUser({ ...props, retryAttempt: (retryAttempt || 0) + 1 })(values),
        },
        error,
        message: `Failed to create user ${fullname}`,
      })

      if (!retryAttempt) {
        throw new SubmissionError(error)
      }
    })
}

const enhancers = [
  withRouter,

  connect(null, {
    showErrorSnackbar,
    showInfoSnackbar,
    showSuccessSnackbar,
  }),

  reduxForm({ form: 'createUser' }),

  graphql(createUserMutation),

  graphql<any, any>(getEmployers, {
    props: ({ data: { allEmployers } }) => {
      return { employers: allEmployers }
    },
  }),

  withHandlers({ handleSubmit }),
]

export default compose(...enhancers)(CreateUserForm)
