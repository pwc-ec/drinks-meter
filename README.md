# Benchmarking AI Frontend

[![build status](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/badges/master/build.svg)](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/pipelines)

## Getting Started

```
# Install yarn
npm i -g yarn

# Install dependencies
yarn


# Checkout and run bmai-backend on http://localhost:3001,
# or configure env to use remote instance:
# - Mac/Unix: export REACT_APP_API_URL=http://backend.bmai.pwc.delivery
# - Windows: set REACT_APP_API_URL=http://backend.bmai.pwc.delivery

# Run local webpack dev server (use new console)
yarn start

# Or, build the project for production, as automated on GitLab pipeline
yarn build
```

## Testing

### TODO

Tests are run with [Jest](https://facebook.github.io/jest/) test runner and written using
[Enzyme](http://airbnb.io/enzyme/) React testing tools.

```
# Run interactive test watcher (use new console)
yarn tests

# Or, test everything and exit
yarn test
```

## Code Style

Install [Prettier](https://github.com/prettier/prettier#editor-integration) and
[TSLint](https://palantir.github.io/tslint/usage/third-party-tools/) support for used editor/IDE. _Both integrations are
needed to check code style_, because
[TSLint can't check standalone GraphQL files](https://github.com/arvitaly/tslint-plugin-graphql/issues/4).

Format your files on save or using editor/IDE integration/shortcut/watcher:

```
# Prettify selected files
yarn prettier --write "src/**/*.{ts,tsx,gql}"

# Prettify and fix auto-fixable TypeScript lint errors in selected file
yarn tslint --fix "src/**/*.{ts,tsx}"
```

Or, reformat all source files in the project:

```
# Prettify all TypeScript/JavaScript/GraphQL/CSS/Markdown files
yarn prettify

# Prettify and fix all auto-fixable TypeScript/JavaScript lint errors
yarn lint --fix
```

Checking CSS/Sass/Less files is supported. However, with
[the MaterialUI component classes and inline styles](https://material-ui-next.com/customization/overrides/) there're
currently no standalone css modules to lint. If we add any later, we can install
[Stylelint](https://stylelint.io/user-guide/complementary-tools/#editor-plugins) support for used editor/IDE, or fix
style lint issues from command line:

```
# Fix auto-fixable style lint errors in selected files
yarn stylelint --fix "src/**/*.{c,le,sa,sc}ss"

# Fix all auto-fixable style lint errors
yarn lintstyle --fix
```

## Continuous Development

Use Gitlab [Merge Requests](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/merge_requests) from feature
branches to [`master`](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/commits/master) branch

```
# Build feature in `feature/feature-branch` and create a new Merge Request on GitLab
yarn mr
```

## Settings

We use
[the same dotenv files](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env)
as [Create React App](https://github.com/facebookincubator/create-react-app).

To define permanent environment variables, create a file called `.env` in the root of your project:

> API_URL=https://api.graph.cool/simple/v1/cj96r02lu9kxr012642rr4q2u

The `.env` files should be checked into source control, with the exclusion of `.env*.local`.

### What .env files can be used?

* `.env`: Default.
* `.env.local`: Local overrides. This file is loaded for all environments except test.
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific
  settings.

Files on the left have more priority than files on the right:

* `yarn start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `yarn build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `yarn test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them. Please refer to the
[dotenv documentation](https://github.com/motdotla/dotenv) for more details.

## Continuous Deployment

[GitLab pipeline](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/pipelines) builds and deploys
[`master`](https://gitlab.pwc.delivery/benchmarkingai/bmai-frontend/commits/master) to
[frontend.bmai.pwc.delivery](http://frontend.bmai.pwc.delivery).

## Dev Stack

The project is based on
[React-Redux-TypeScript Boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate).

### UI Components

* [Material-UI Next](https://material-ui-next.com/) React components

### Base Components

* [Typescript](https://www.typescriptlang.org/) 2.5
* [React](https://facebook.github.io/react/) 16
* [Redux](https://github.com/reactjs/redux) 3.7
* [React Router](https://github.com/ReactTraining/react-router) 4.2
* [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

### Test Tools

* [Jest](https://facebook.github.io/jest/)
* [Enzyme](http://airbnb.io/enzyme/)

### Code Style Tools

* [Prettier](https://github.com/prettier/prettier)
* [TSLint](https://palantir.github.io/tslint/)
  * [TSLint Recommended Config](https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts)
  * [TSLint-React](https://github.com/palantir/tslint-react)
  * [TSLint-ESLint Rules](https://github.com/buzinas/tslint-eslint-rules)
  * [TSLint GraphQL Plugin](https://github.com/arvitaly/tslint-plugin-graphql)
  * [TSLint Prettier Config](https://github.com/alexjoverm/tslint-config-prettier)
  * [TSLint Prettier Plugin](https://github.com/ikatyang/tslint-plugin-prettier)
  * [TS Checker Webpack Plugin](https://github.com/zinserjan/ts-checker-webpack-plugin)
* [Stylelint](https://stylelint.io/)
  * [Stylelint Standard Config](https://github.com/stylelint/stylelint-config-standard)
  * [Stylelint Prettier Config](https://github.com/shannonmoeller/stylelint-config-prettier)
  * [Stylelint Webpack Plugin](https://github.com/JaKXz/stylelint-webpack-plugin)

### Build Tools

* [Webpack](https://webpack.github.io) 3
  * [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  * [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)
* [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
* [PostCSS Loader](https://github.com/postcss/postcss-loader)
  * [CSS next](https://github.com/MoOx/postcss-cssnext)
  * [CSS modules](https://github.com/css-modules/css-modules)
* [ExtractText Plugin](https://github.com/webpack/extract-text-webpack-plugin)
* [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
