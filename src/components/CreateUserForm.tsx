import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'
import { Field } from 'redux-form'
import { email, required } from 'redux-form-validators'

import FormCheckbox from './FormCheckbox'
import FormField from './FormField'
import FormSelect from './FormSelect'

const styles = theme => {
  const { bmai: { form } } = theme
  // console.debug('form.theme', { form, theme })
  return form
}

const CreateUserForm = props => {
  const { classes, employers, handleSubmit, invalid, isOpen, close, submitting } = props

  // console.debug(`form(${props.form}).render`, props)

  return (
    <Dialog open={isOpen} onRequestClose={close}>
      <DialogTitle>Create new user</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className={classes.modalForm}>
          <Grid direction="column" container={true}>
            <Grid item={true}>
              <Field
                name="fullname"
                label="Full name"
                type="text"
                validate={[required()]}
                required={true}
                component={FormField}
                fullWidth={true}
                margin="large"
              />
            </Grid>
            <Grid item={true}>
              <Field
                name="email"
                label="Email"
                type="email"
                validate={[required(), email()]}
                required={true}
                component={FormField}
                fullWidth={true}
                margin="large"
              />
            </Grid>
            <Grid item={true}>
              <Field
                name="password"
                label="Password"
                type="password"
                validate={[required()]}
                required={true}
                component={FormField}
                fullWidth={true}
                margin="normal"
              />
            </Grid>
            <Grid item={true}>
              <Field
                name="employer"
                label="Employer"
                options={employers}
                component={FormSelect}
                fullWidth={true}
                margin="normal"
              />
            </Grid>
            <Grid item={true}>
              <Field name="isAdmin" label="Administrator" component={FormCheckbox} fullWidth={true} margin="normal" />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button key={0} color="primary" disabled={submitting} onClick={close}>
          Cancel
        </Button>
        <Button key={1} color="primary" type="submit" disabled={invalid || submitting} onClick={handleSubmit}>
          Create user
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(CreateUserForm)
