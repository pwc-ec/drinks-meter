import * as React from 'react'

// Wrap function or functional stateless component as react class component.
// Useful e.g. if you need to reference the component in React 16.
class Componentize extends React.Component<any, null> {
  public render() {
    const { Component, ...props } = this.props
    return typeof Component === 'function' ? Component(props) : <Component {...props} />
  }
}

export default Componentize
