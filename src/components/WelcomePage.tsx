import { withStyles } from 'material-ui'
import Typography from 'material-ui/Typography'
import * as React from 'react'
import Joyride from 'react-joyride'

export interface IWelcomePageProps {
  classes?: any
}

const styles = theme => ({
  header: {
    background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url("/img/buildings.jpg")', // make background darker to better readibility
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    paddingBottom: `calc(${theme.bmai.padding.size} * 4)`,
    paddingLeft: theme.bmai.padding.size,
    paddingRight: theme.bmai.padding.size,
    paddingTop: `calc(${theme.bmai.padding.size} * 4)`,
  },
  textWhite: {
    color: theme.bmai.palette.contrast,
  },
})

const steps = [
  {
    selector: 'header div div div:nth-child(2) div[role="button"]',
    text: 'Click here to create new report.',
    title: 'First step',
  },
]

const WelcomePage: React.SFC<IWelcomePageProps> = ({ classes }) => (
  <article>
    <Joyride
      debug={true}
      run={true}
      autoStart={true}
      showSkipButton={true}
      showStepsProgress={true}
      steps={steps}
      allowClicksThruHole={true}
      type="continuous"
    />
    <header className={classes.header}>
      <Typography type="display3" className={classes.textWhite}>
        Welcome to Benchmarking AI
      </Typography>
    </header>
  </article>
)

export default withStyles(styles)(WelcomePage)
