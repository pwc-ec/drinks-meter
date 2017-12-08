import * as React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { userSignIn } from '../actions/users'

import { routeDashboard, routeWelcome } from '../constants/routes'

import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { showErrorSnackbar } from '../actions/snackbars'
import SignInForm from '../components/SignInForm'
import * as getUser from '../graphql/queries/getUser.gql'
import * as signInMutation from '../graphql/queries/signIn.gql'

class SignInFormContainer extends React.Component<any, any> {
  public constructor(props) {
    super(props)
    this.state = { errors: {} }
  }

  public render() {
    return <SignInForm onSubmit={this.validateAndLogIn} errors={this.state.errors} />
  }

  private validateAndLogIn = (values, dispatch) => {
    this.props.mutate({ variables: values }).then(({ data: { signIn } }) => {
      if (signIn.error === 1) {
        this.setState({ errors: { email: 'Email ' + values.email + ' not found.' } })
      } else if (signIn.error === 2) {
        this.setState({ errors: { password: 'Password is incorrect.' } })
      } else {
        dispatch(userSignIn(signIn))
        // tslint:disable-next-line: no-shadowed-variable
        const { client, history, showErrorSnackbar } = this.props
        const { userId: id } = signIn
        client
          .query({
            query: getUser,
            variables: { id },
          })
          .then(({ data: { User: { lastReport } } }) => {
            if (!lastReport) {
              history.push(routeWelcome())
            } else {
              history.push(routeDashboard())
            }
          })
          .catch(err => {
            showErrorSnackbar('Unable to query user profile')
            console.error('Failed query getUser', err)
          })
      }
    })
  }
}

const enhancers = [
  connect(null, {
    showErrorSnackbar,
  }),
  withRouter,
  withApollo,
  graphql(signInMutation),
]

export default compose(...enhancers)(SignInFormContainer)
