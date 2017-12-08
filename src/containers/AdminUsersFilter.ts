import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { reduxForm, SubmissionError } from 'redux-form'

import AdminUsersFilter from '../components/AdminUsersFilter'

export const form = 'filterUsers'

const enhancers = [reduxForm({ form })]

export default compose(...enhancers)(AdminUsersFilter)
