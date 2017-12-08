import TextField from 'material-ui/TextField'
import * as React from 'react'

const FormField = props => {
  const { autoComplete, autoFocus, fullWidth, input, label, type, required, disabled, meta: { touched, error } } = props

  console.debug(`form(${props.meta.form}).field(${input.name})[${type}]`, input.value, props)

  return (
    <TextField
      {...input}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      error={touched && !!error}
      fullWidth={fullWidth}
      type={type}
      label={label}
      required={required}
      disabled={disabled}
      helperText={(touched && error) || null}
    />
  )
}

export default FormField
