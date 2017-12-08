// Global definitions for development

// Style loader definitions
declare module '*.css' {
  const styles: any
  export = styles
}

// GraphQL loader definitions
declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export = value
}

// Redux DevTools extension definitions
// tslint:disable-next-line: interface-name
declare interface Window {
  devToolsExtension?(): (args?: any) => any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(options?: any): (args?: any) => any
}
