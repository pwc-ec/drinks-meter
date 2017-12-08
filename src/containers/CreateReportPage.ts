import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { deselectCompany, selectCompany, suggestCompanies } from '../actions/companies'
import { showErrorSnackbar } from '../actions/snackbars'
import { routeDashboard } from '../constants/routes'

import CreateReportPage, { ICreateReportPageProps } from '../components/CreateReportPage'
import * as createGraphMutation from '../graphql/mutations/createGraph.gql'
import * as createReportMutation from '../graphql/mutations/createReport.gql'
import * as updateUserLastReportMutation from '../graphql/mutations/updateUserLastReport.gql'
import * as getReportsByUserIdQuery from '../graphql/queries/getReportsByUserId.gql'
import * as getUserQuery from '../graphql/queries/getUser.gql'
import { suggestCompaniesQuery } from '../graphql/queries/suggestCompanies'

import { differenceWith } from 'lodash'
import { getLogo } from '../services/companyLogo'
import { isEqualById } from '../services/data'

// ------------------------------------------------------------------------------------------------

const transformSuggestions = (suggestedCompanies, { selectedCompanies }) =>
  (selectedCompanies && selectedCompanies.length
    ? differenceWith(suggestedCompanies, selectedCompanies, isEqualById)
    : suggestedCompanies
  ).map(company => ({ ...company, logo: getLogo(company) }))

// ------------------------------------------------------------------------------------------------

interface IProps extends ICreateReportPageProps {
  userId?: string
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  connect(
    ({ companies: { selected, suggestCompanyInput }, reports: { saving }, sign: { userId } }) => ({
      saving,
      selectedCompanies: selected,
      suggestCompanyInput,
      userId,
    }),
    {
      deselectCompany,
      selectCompany,
      showErrorSnackbar,
      suggestCompanies,
    },
  ),

  suggestCompaniesQuery({ inputProp: 'suggestCompanyInput', transformSuggestions }),

  graphql<IUserData, IProps>(getUserQuery, {
    options: ({ userId }) => ({
      variables: {
        id: userId,
      },
    }),
    props: ({ data: { User }, ownProps }) => ({
      showJoyride: !(User && User.lastReport && User.lastReport.id),
      userCompany:
        User && User.employer && User.employer.company
          ? { ...User.employer.company, logo: getLogo(User.employer.company) }
          : null,
    }),
  }),

  graphql<IReport, IProps>(createReportMutation, {
    name: 'createReport',
    options: ({ selectedCompanies, userId }) => ({
      refetchQueries: [
        {
          query: getReportsByUserIdQuery,
          variables: { userId },
        },
      ],
      variables: {
        companiesIds: selectedCompanies.map(c => c.id),
        name: selectedCompanies.map(c => c.name).join(' | '),
        userId,
      },
    }),
  }),

  graphql<IReport, IProps>(updateUserLastReportMutation, {
    name: 'updateUserLastReport',
  }),

  graphql<IReport, IProps>(createGraphMutation, {
    name: 'createGraph',
  }),

  withHandlers({
    onCreateReport: ({ createGraph, createReport, history, updateUserLastReport, user }) => (
      selectedCompanies,
      done,
    ) => {
      createReport({
        variables: {
          companiesIds: selectedCompanies.map(c => c.id),
          name: selectedCompanies.map(c => c.name).join(' | '),
          userId: user.id,
        },
      })
        .then(({ data }) => {
          const { createReport: { id: reportId } } = data

          // createGraph({ variables: { reportId } })

          updateUserLastReport({ variables: { userId: user.id, reportId } })
            .then(userResponse => {
              done()
              history.push(routeDashboard())
            })
            .catch(error => console.error('updateUserLastReport mutation failed', error))
        })
        .catch(error => console.error('createReport mutation failed', error))
    },
  }),
]

export default compose(...enhancers)(CreateReportPage)
