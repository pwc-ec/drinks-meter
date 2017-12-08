import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'
import { ReactElement } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { userSignOut } from '../actions/users'
import SignInForm from '../containers/SignInForm'
import * as getUser from '../graphql/queries/getUser.gql'

const styles = theme => {
  const { bmai: { form: { form } }, mixins: { gutters } } = theme
  return { form: gutters(form) }
}

class EnsureLoggedInContainer extends React.Component<any, any> {
  public render() {
    if (this.props.user) {
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child as ReactElement<any>, { history: this.props.history, user: this.props.user }),
      )
    } else if (this.props.loading === false) {
      return (
        <Paper className={this.props.classes.form} elevation={4}>
          <SignInForm />
        </Paper>
      )
    }
    return null
  }

  public componentDidUpdate() {
    if (!this.props.loading && !this.props.user) {
      this.props.signOut()
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signOut() {
      dispatch(userSignOut())
    },
  }
}

const mapStateToProps = ({ sign: { userId } }) => ({ userId })

const enhancers = [
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  graphql<IUserData, any>(getUser, {
    options: ({ userId }) => ({
      variables: {
        id: userId ? userId : '',
      },
    }),
    props: ({ data, ownProps }) => {
      return { user: data.User, loading: data.loading }
    },
  }),
]

export default compose(...enhancers)(withStyles(styles)(EnsureLoggedInContainer))
