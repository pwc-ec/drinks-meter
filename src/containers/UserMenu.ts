import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { userSignOut } from '../actions/users'
import UserMenu from '../components/UserMenu'
import { routeHomepage } from '../constants/routes'
import * as getUser from '../graphql/queries/getUser.gql'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signOut() {
      ownProps.history.push(routeHomepage())
      dispatch(userSignOut())
    },
  }
}

const mapStateToProps = ({ sign: { userId } }) => ({ userId })

const enhancers = [
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql<IUserData, any>(getUser, {
    options: ({ userId }) => ({
      variables: {
        id: userId ? userId : '',
      },
    }),
    props: ({ data, ownProps }) => {
      return { fullname: data.User ? data.User.fullname : null, admin: data.User ? data.User.isAdmin : null }
    },
  }),
]

export default compose(...enhancers)(UserMenu)
