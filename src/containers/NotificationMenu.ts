import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'

import { showErrorSnackbar, showSuccessSnackbar } from '../actions/snackbars'

import NotificationMenu, { INoficationMenuProps } from '../components/NotificationMenu'

import * as deleteNotificationMutation from '../graphql/mutations/deleteNotification.gql'
import * as updateUserSubscriptionMutation from '../graphql/mutations/updateUserSubscription.gql'
import * as getCompaniesQuery from '../graphql/queries/getCompanies.gql'
import * as getNotificationsQuery from '../graphql/queries/getNotifications.gql'
import * as getReportsByUserIdQuery from '../graphql/queries/getReportsByUserId.gql'
import * as getUserQuery from '../graphql/queries/getUser.gql'

// ------------------------------------------------------------------------------------------------

interface IProps extends INoficationMenuProps {
  deleteNotification: () => void
  showError: (msg) => string
  showSuccess: (msg) => string
  userId: string
}

// ------------------------------------------------------------------------------------------------

const mapDispatchToProps = (dispatch, ownProps) => ({
  showError: msg => dispatch(showErrorSnackbar(msg)),
  showSuccess: msg => dispatch(showSuccessSnackbar(msg)),
})

const mapStateToProps = (state: IRootState) => ({
  userId: state.sign.userId,
})

// ------------------------------------------------------------------------------------------------

const enhancers = [
  withRouter,

  connect(mapStateToProps, mapDispatchToProps),

  branch(({ userId }) => !userId, renderComponent(() => null)),

  graphql<IAllCompanies, IProps>(getCompaniesQuery, {
    props: ({ data, ownProps }) => ({
      allCompanies: data.allCompanies || [],
      loadingCompanies: data.loading,
    }),
  }),

  graphql<IAllReports, IProps>(getReportsByUserIdQuery, {
    options: ({ userId }) => ({
      variables: {
        userId,
      },
    }),
    props: ({ data: { allReports, loading }, ownProps }) => {
      const companiesReportsCount = allReports
        ? allReports.reduce<any>((mapCount, report) => {
            report.companies.forEach(company => {
              mapCount[company.id] = mapCount[company.id] ? mapCount[company.id] + 1 : 1
            })
            return mapCount
          }, {})
        : []
      return {
        companiesReportsCount,
      }
    },
  }),

  graphql<IAllNotifications, IProps>(getNotificationsQuery, {
    options: ({ userId }) => ({
      pollInterval: 15000,
      variables: {
        userId: userId ? userId : '',
      },
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      notifications: data.allNotifications || [],
    }),
  }),

  graphql<IUserData, any>(getUserQuery, {
    options: ({ userId }) => ({
      variables: {
        id: userId ? userId : '',
      },
    }),
    props: ({ data, ownProps }) => ({
      subscribedCompaniesIds:
        data.User && data.User.notificationCompanies ? data.User.notificationCompanies.map(company => company.id) : [],
    }),
  }),

  graphql<INotification, IProps>(deleteNotificationMutation, {
    name: 'deleteNotification',
    options: ({ userId }) => ({
      update: (store, { data: { deleteNotification } }) => {
        const data = store.readQuery<IAllNotifications>({ query: getNotificationsQuery, variables: { userId } })
        data.allNotifications = data.allNotifications.filter(n => n.id !== deleteNotification.id)
        store.writeQuery({ query: getNotificationsQuery, variables: { userId }, data })
      },
    }),
  }),

  graphql<IUserData, IProps>(updateUserSubscriptionMutation, {
    name: 'updateUserSubscription',
    options: ({ userId }) => ({
      refetchQueries: [
        {
          query: getUserQuery,
          variables: { id: userId },
        },
        {
          query: getNotificationsQuery,
          variables: { userId },
        },
      ],
    }),
  }),

  withState('open', 'toggleOpen', false),
  withState('openModal', 'toggleOpenModal', false),

  withHandlers({
    hide: ({ toggleOpen }) => e => {
      setTimeout(() => toggleOpen(false), 200)
    },

    onDelete: ({ deleteNotification, showSuccess, showError, toggleOpen }) => notifToDelete => {
      toggleOpen(false)
      deleteNotification({ variables: { id: notifToDelete.id } })
        .then(({ data }) => {
          showSuccess('Successfully deleted the notification')
        })
        .catch(err => {
          showError('Failed to delete the notification')
          console.error(`Failed to delete notification "${notifToDelete.id}"`, err)
        })
    },

    onModifySubscription: ({
      showSuccess,
      showError,
      toggleOpenModal,
      updateUserSubscription,
      userId,
    }) => companies => {
      toggleOpenModal(false)
      if (!companies) {
        return
      }

      const companiesIds = companies.map(c => c.id)
      updateUserSubscription({ variables: { userId, companiesIds } })
        .then(response => {
          showSuccess('Successfully updated subscription')
        })
        .catch(err => {
          console.error('NotificationMenu: updateUserSubscription mutation failed', err)
          showError('Failed to update subscription to company data change notifications')
        })
    },

    onSubscribe: ({ toggleOpenModal }) => e => {
      toggleOpenModal(true)
    },

    toggleOpen: ({ toggleOpen }) => e => toggleOpen(open => !open),
    toggleOpenModal: ({ toggleOpenModal }) => e => toggleOpenModal(openModal => !openModal),
  }),
]

export default compose(...enhancers)(NotificationMenu)
