import { graphql } from 'react-apollo'

import { suggest } from '../../services/suggest'
import * as query from './getCompanies.gql'

export const getSuggestedCompanyName = (company: ICompany): string => company.name

// TODO: Handle filtering and limiting results on backend when needed.
export const suggestCompaniesQuery = options => {
  const { inputProp, suggestAllOnEmptyInput, transformSuggestions } = options

  return graphql<IAllCompanies, any>(query, {
    props: ({ data, ownProps }) => {
      const { allCompanies, error, loading, refetch } = data

      if (error) {
        console.error(`query(suggestCompanies).error: ${error}`, { data, ownProps, options, query })

        // tslint:disable-next-line: no-shadowed-variable
        const { showErrorSnackbar } = ownProps
        setTimeout(() =>
          showErrorSnackbar({
            actions: { Retry: () => refetch() },
            error,
            message: `Failed to fetch list of companies`,
          }),
        )
        return { suggestedCompaniesError: error }
      }

      const all = allCompanies || []

      const input = inputProp ? ownProps[inputProp] : false

      const filtered = inputProp
        ? ownProps[inputProp]
          ? all.length ? suggest(all, ownProps[inputProp]) : all
          : suggestAllOnEmptyInput ? all : []
        : all

      const transformed = filtered.length && transformSuggestions ? transformSuggestions(filtered, ownProps) : filtered

      console.debug(`query(suggestCompanies).response`, input, { all, filtered, transformed, data, ownProps, options })

      return {
        getSuggestedCompanyName,
        suggestedCompanies: transformed,
        suggestedCompaniesLoading: loading,
      }
    },
  })
}
