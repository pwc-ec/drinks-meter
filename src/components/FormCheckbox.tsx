import Checkbox from 'material-ui/Checkbox'
import { FormControl, FormControlLabel } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'

const styles = theme => {
  const { bmai: { form: { label } } } = theme
  return {
    label,
  }
}

const FormCheckbox = props => {
  const { fullWidth, input, label, name, classes } = props

  return (
    <FormControl fullWidth={fullWidth}>
      <FormControlLabel
        classes={classes}
        control={<Checkbox {...input} value={name} checked={!!input.value} />}
        label={label}
      />
    </FormControl>
  )
}

export default withStyles(styles)(FormCheckbox)
