import { graphql } from 'react-apollo'

import { filterValues, isNotEmpty, mapKeysWithKeymap } from '../../services/data'
import * as query from './getUsers.gql'

const userFilterKeymap = {
  email: 'email_contains',
  employer: ['employer', 'name_contains'],
  fullname: 'fullname_contains',
  isAdmin: 'isAdmin',
  isEnabled: 'isEnabled',
}

// TODO: Handle filtering and limiting results on backend when needed.
export const getUsers = options => {
  const { filterProp, transform } = options

  return graphql<IAllUsers, any>(query, {
    options: ownProps => {
      const userFilter = (filterProp && ownProps[filterProp]) || null
      const filter = userFilter && mapKeysWithKeymap(filterValues(userFilter, isNotEmpty), userFilterKeymap)
      return {
        variables: {
          filter,
        },
      }
    },
    props: ({ data, ownProps }) => {
      const { allUsers, error, loading, refetch } = data

      if (error) {
        console.error(`query(getUsers).error: ${error}`, { data, ownProps, options, query })

        // tslint:disable-next-line: no-shadowed-variable
        const { showErrorSnackbar } = ownProps
        setTimeout(() =>
          showErrorSnackbar({
            actions: { Retry: () => refetch() },
            error,
            message: `Failed to fetch users`,
          }),
        )
        return { suggestedCompaniesError: error }
      }

      const all = allUsers || []

      const transformed = all.length && transform ? transform(all, ownProps) : all

      const filter = filterProp ? ownProps[filterProp] : false

      console.debug(`query(getUsers).response`, filter, { all, transformed, data, ownProps, options })

      return {
        users: all,
        usersLoading: loading,
      }
    },
  })
}
