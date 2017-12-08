import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import * as React from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import FormField from './FormField'

const decorate = withStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error[900],
    color: theme.palette.common.white,
    padding: '1rem',
  },
}))

class LoginForm extends React.Component<any, any> {
  public render() {
    const errors = Object.keys(this.props.errors).map((key, index) => (
      <Card className={this.props.classes.error} raised={false} key={index}>
        <Typography type="title" color="inherit">
          {this.props.errors[key]}
        </Typography>
      </Card>
    ))

    return (
      <form onSubmit={this.props.handleSubmit}>
        <Grid direction="column" container={true}>
          <Grid item={true}>{errors}</Grid>
          <Grid item={true}>
            <Field
              name="email"
              required={false}
              component={FormField}
              type="email"
              label="Email"
              fullWidth={true}
              margin="large"
            />
          </Grid>
          <Grid item={true}>
            <Field
              name="password"
              required={false}
              component={FormField}
              type="password"
              label="Password"
              fullWidth={true}
              margin="normal"
            />
          </Grid>
          <p />
          <Grid item={true}>
            <Button raised={true} type="submit" color="primary">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const validate = values => {
  const errors: any = {}

  if (!values.email) {
    errors.email = 'Fill your email please.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email is not in correct format.'
  }

  if (!values.password) {
    errors.password = 'Fill your password please.'
  }

  return errors
}

export default reduxForm({ form: 'LoginForm', validate })(decorate<any>(LoginForm))
