import * as React from 'react'

import TextField from 'material-ui/TextField'

interface ITimeoutTextFieldProps {
  autoFocus?: boolean
  className?: any
  defaultValue?: any
  disabled?: boolean
  helperText?: string
  helperTextClassName?: string
  inputClassName?: string
  label?: string
  labelClassName?: string
  onBlur?: (elementRef) => void
  onChange?: (value, elementRef) => void
  timeout?: number
  type?: string
  value?: any
}

export default class TimeoutTextField extends React.Component<ITimeoutTextFieldProps, null> {
  private timerHandle: any

  private inputRef: any

  constructor(props) {
    super(props)
  }

  public render() {
    const {
      autoFocus = true,
      className,
      defaultValue,
      disabled,
      helperText,
      helperTextClassName,
      inputClassName,
      label,
      labelClassName,
      type,
      value,
    } = this.props

    return (
      <TextField
        autoFocus={autoFocus}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        helperText={helperText}
        helperTextClassName={helperTextClassName}
        InputClassName={inputClassName}
        label={label}
        labelClassName={labelClassName}
        fullWidth={true}
        onChange={this.handleChange}
        inputRef={this.handleInputRef}
        type={type || 'string'}
        value={value}
        onBlur={this.handleBlur}
        onFocus={this.handleChange}
      />
    )
  }

  private handleBlur = el => {
    setTimeout(() => {
      if (this.props.onBlur) {
        this.props.onBlur(this.inputRef)
      }
    }, this.props.timeout * 2)
  }

  private handleInputRef = el => {
    this.inputRef = el
  }

  private handleChange = e => {
    const { onChange, timeout } = this.props
    if (!onChange) {
      return
    }

    this.delayOnChangeCallback(e, onChange, timeout)
  }

  private delayOnChangeCallback = (e, callback, timeout) => {
    clearTimeout(this.timerHandle)
    e.preventDefault()
    e.stopPropagation()
    const el = e.target
    this.timerHandle = setTimeout(() => {
      callback(el.value, this.inputRef)
    }, timeout || 400)
  }
}
