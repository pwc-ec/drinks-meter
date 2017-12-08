import * as React from 'react'
import { Field } from 'redux-form'
import { email, required } from 'redux-form-validators'

import CheckIcon from 'material-ui-icons/Check'
import NotInterestedIcon from 'material-ui-icons/NotInterested'
import PersonIcon from 'material-ui-icons/Person'
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import { formatJson, parseJson } from '../services/data'
import FormField from './FormField'
import FormSelect from './FormSelect'
import NoIcon from './NoIcon'

const styles = theme => {
  // const { bmai } = theme
  return {}
}

const isAdminOptions = [
  { id: 'null', name: 'All', icon: NoIcon },
  { id: 'true', name: 'Administrators', icon: SupervisorAccountIcon },
  { id: 'false', name: 'Users', icon: PersonIcon },
]

const isEnabledOptions = [
  { id: 'null', name: 'All', icon: NoIcon },
  { id: 'true', name: 'Enabled Users', icon: CheckIcon },
  { id: 'false', name: 'Disabled Users', icon: NotInterestedIcon },
]

const AdminUsersFilter = props => {
  // const { classes } = props

  return (
    <form>
      <Grid container={true} alignItems="stretch">
        <Grid item={true} xs={6} sm={4}>
          <Field name="fullname" label="Filter by name" type="text" component={FormField} fullWidth={true} />
        </Grid>
        <Grid item={true} xs={6} sm={4}>
          <Field name="email" label="Email" type="text" component={FormField} fullWidth={true} />
        </Grid>
        <Grid item={true} xs={6} sm={2}>
          <Field name="employer" label="Employer" type="text" component={FormField} fullWidth={true} />
        </Grid>
        <Grid item={true} xs={3} sm={1}>
          <Field
            name="isAdmin"
            label="Role"
            type="select"
            component={FormSelect}
            options={isAdminOptions}
            format={formatJson}
            parse={parseJson}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={3} sm={1}>
          <Field
            name="isEnabled"
            label="Enabled"
            type="select"
            component={FormSelect}
            options={isEnabledOptions}
            format={formatJson}
            parse={parseJson}
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default withStyles(styles)(AdminUsersFilter)
