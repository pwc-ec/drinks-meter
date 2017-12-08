import { find } from 'lodash'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import { withStyles } from 'material-ui/styles'
import * as React from 'react'

const styles = theme => {
  const { bmai: { form } } = theme
  return form
}

const renderOption = classes => ({ id, name, icon: IconComponent }) => (
  <MenuItem key={`${id}`} value={id} className={classes.selectMenuItem}>
    {IconComponent ? <IconComponent className={classes.selectMenuIcon} /> : null}
    {name}
  </MenuItem>
)

const renderValue = (classes, options) => value => {
  const { name, icon: IconComponent } = find(options, { id: value }) || { name: '', icon: null }
  return IconComponent ? <IconComponent className={classes.selectValueIcon} /> : name
}

// Note: Workaround for select value clearing on blur.
// See: https://github.com/erikras/redux-form/issues/2768
// See: https://github.com/erikras/redux-form/issues/1185
const handleBlur = e => e.preventDefault()

const FormSelect = props => {
  const { fullWidth, input, label, name, options, classes, ...pass } = props
  const selectId = `select-${name}`
  const MenuItems = options && options.length ? options.map(renderOption(classes)) : []

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <Select
        {...input}
        {...pass}
        name={name}
        className={classes.selectMenu}
        renderValue={renderValue(classes, options)}
        input={<Input id={selectId} />}
        onBlur={handleBlur}
      >
        {MenuItems}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(FormSelect)
