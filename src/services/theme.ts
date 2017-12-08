import { blue, green, grey, indigo, orange, red } from 'material-ui/colors'
import { createMuiTheme, Theme } from 'material-ui/styles'
import { darken, lighten } from 'material-ui/styles/colorManipulator'
import 'typeface-roboto'

// define PwC compliance palette and fonts - begin

// const primaryColor = '#602320' // maaroon, rgb(96,35,32)
// const secondaryColor = '#a32020' // burgundy, rgb(163,32,32)
// const tertiaryColor = '#e0301e' // red, rgb(224,48,30), used as accent

const primaryColor = '#a32020' // burgundy, rgb(163,32,32)
const secondaryColor = '#602320' // maaroon, rgb(96,35,32)
const tertiaryColor = '#e0301e' // red, rgb(224,48,30), used as accent

// const primaryColor = '#e0301e' // red, rgb(224,48,30)
// const secondaryColor = '#a32020' // burgundy, rgb(163,32,32)
// const tertiaryColor = '#602320' // maaroon, rgb(96,35,32)

const roseColor = '#d93954' // rose, rgb(217,57,84)
const orangeColor = '#d04a02' // orange, rgb(208, 74, 2)
const blackColor = '#404041' // black, rgb(64,64,65)
const lightBlackColor = '#6d6e71' // 70% black, rgb(109,110,113)
const faintGreyColor = '#f2f2f2' // rgb(242,242,242)
const whiteColor = '#ffffff' // white, rgb(255,255,255)

const primaryHoverColor = darken(primaryColor, 0.15) // 15% shade
const secondaryHoverColor = darken(secondaryColor, 0.15)
const tertiaryHoverColor = darken(tertiaryColor, 0.15) // 15% shade

const tertiaryActiveColor = darken(tertiaryColor, 0.2)

const accentColor = primaryColor
const accentHoverColor = darken(accentColor, 0.15)

const fontFamilyHeadline = 'Georgia, Arial'
const fontFamilyBody = 'Arial, "Helvetica Neue", Helvetica, sans-serif'

const darkWhiteColor = 'rgba(255, 255, 255, 0.88)'
const faintBlackColor = 'rgba(0, 0, 0, 0.12)'
const minBlackColor = 'rgba(0, 0, 0, 0.26)'
const lightGreyColor = '#c1c2c6'

const appHeaderHeight = 64 // px, height of AppHeader component

// define PwC compliance palette and fonts - end

export interface IBmaiTheme extends Theme {
  bmai: any
}

const theme: IBmaiTheme = createMuiTheme<any>({
  bmai: {
    appHeader: {
      height: appHeaderHeight,
    },
    autosuggest: {
      // container: {},
      // containerOpen: {},
      // input: {},
      // inputFocused: {},
      // inputOpen: {},
      // sectionContainer: {},
      // sectionContainerFirst: {},
      // sectionTitle: {},
      // suggestion: {},
      // suggestionFirst: {},
      // suggestionHighlighted: {},
      // suggestionsContainer: {},
      suggestionsContainerOpen: {
        marginBottom: '3em',
        marginTop: '1em',
        minWidth: '30rem',
        position: 'absolute',
        zIndex: 2,
      },
      suggestionsList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },
    },
    button: {
      raised: true,
    },
    buttonFloating: {
      background: faintBlackColor,
      color: blackColor,
      contrastBackground: darkWhiteColor,
      hoverBackground: primaryColor,
      hoverColor: whiteColor,
      marginLeft: '0.75rem',
      regularSize: 40,
      smallSize: 32,
    },
    dialog: {
      buttonSpaceBetween: '0.5rem',
      height: '85vh',
    },
    form: {
      form: {
        margin: 'auto',
        marginBottom: '10%',
        marginTop: '10%',
        padding: '3rem',
        width: '30rem',
      },
      label: {
        fontSize: '1.1em',
        fontWeight: 'normal',
      },
      modalForm: {
        minWidth: '27rem',
      },
      selectMenuIcon: {
        color: grey[500],
        marginRight: 16, // Match ListItemIcon.
      },
      selectMenuItem: {
        fontSize: '1.1em',
      },
      selectValueIcon: {
        color: grey[500],
        margin: '0 4px',
      },
    },
    list: {
      accentIcon: {
        color: grey[400],
      },
      data: {
        marginTop: '1rem',
      },
      defaultIcon: {
        color: grey[200],
      },
      fab: {
        backgroundColor: primaryColor,
        color: whiteColor,
      },
      fabRoot: {
        bottom: 0,
        margin: 16,
        position: 'fixed',
        right: 0,
      },
      list: {
        margin: 'auto',
        maxWidth: '80rem',
        padding: '1rem',
      },
      listItem: {
        margin: '0 -13px',
        padding: '8px 13px',
      },
      listItemText: {
        // fontSize: '1rem',
      },
      loading: {
        marginTop: '10%',
      },
      noData: {
        marginTop: '10%',
      },
      noIcon: {
        height: 24,
        width: 24,
      },
    },
    menu: {
      right: 16, // default spacing
      top: appHeaderHeight - 6, // AppHeader.height - 6 = 64 - 6
    },
    padding: {
      size: '1rem', // main content padding
    },
    palette: {
      accent: tertiaryColor,
      black: blackColor,
      contrast: whiteColor,
      contrastLight: darken(whiteColor, 0.15),
      faintGrey: faintGreyColor,
      gradientBottomRight: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))',
      gradientLeftRight: 'linear-gradient(to right, rgb(138, 203, 205), rgb(211, 235, 235))',
      lightBlack: lightBlackColor,
      lightGrey: lightGreyColor,
      primary: primaryColor,
      primaryHover: primaryHoverColor,
      secondary: secondaryColor,
      secondaryHover: secondaryHoverColor,
      tertiary: tertiaryColor,
      tertiaryActive: tertiaryActiveColor,
      tertiaryHover: tertiaryHoverColor,
    },
    progress: {
      height: '.2rem',
      left: 0,
      position: 'fixed',
      top: 0,
      width: '100%',
    },
    simpleGraph: {
      grid: lightGreyColor,
    },
    snackbar: {
      content: {
        fontSize: '1rem',
      },
      intent: {
        error: {
          backgroundColor: tertiaryColor,
          color: whiteColor,
        },
        info: {
          backgroundColor: blue.A700,
          color: whiteColor,
        },
        success: {
          backgroundColor: green.A700,
          color: whiteColor,
        },
        warning: {
          backgroundColor: orange.A700,
          color: whiteColor,
        },
      },
    },
    text: {
      titleStyle: 'italic',
    },
  },
  /*
  overrides: {
    MuiButton: {
      fab: {
        '&:hover': {
          color: whiteColor,
        },
        backgroundColor: faintBlackColor,
        color: blackColor,
      },
      flatAccent: {
        '&:hover': {
          backgroundColor: accentHoverColor,
        },
        backgroundColor: accentColor,
        color: whiteColor,
      },
      flatPrimary: {
        '&:hover': {
          backgroundColor: primaryHoverColor,
        },
        backgroundColor: primaryColor,
        color: whiteColor,
      },
      raised: {
        boxShadow: 'none',
      },
      root: {
        borderRadius: '33px',
        // textTransform: 'capitalize',
      },
    },
    MuiChip: {
      root: {
        backgroundColor: primaryColor,
        fontFamily: fontFamilyHeadline,
        fontStyle: 'italic',
        paddingLeft: '0.2rem',
      },
    },
    MuiFormLabel: {
      focused: {
        color: primaryColor,
      },
    },
    MuiInput: {
      inkbar: {
        '&:after': {
          backgroundColor: primaryColor,
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '15px',
      },
    },
  },
  */
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
})

// override default colors with BMAI colors - begin

theme.typography.subheading.color = blackColor

/*
theme.palette.background.appBar = primaryColor
theme.palette.primary[500] = primaryColor
theme.palette.primary[700] = primaryHoverColor
theme.palette.secondary.A200 = accentColor // used for accent
theme.palette.secondary.A400 = accentHoverColor

theme.typography.fontFamily = fontFamilyBody
theme.typography.display1.fontFamily = fontFamilyHeadline
theme.typography.display1.color = blackColor
theme.typography.display2.fontFamily = fontFamilyHeadline
theme.typography.display2.color = blackColor
theme.typography.display2.fontSize = '1.3125rem'
theme.typography.display3.fontFamily = fontFamilyHeadline
theme.typography.display4.fontFamily = fontFamilyHeadline
theme.typography.headline.fontFamily = fontFamilyBody
theme.typography.title.fontFamily = fontFamilyBody
theme.typography.subheading.fontFamily = fontFamilyBody
theme.typography.subheading.color = blackColor
theme.typography.body1.fontFamily = fontFamilyBody
theme.typography.body2.fontFamily = fontFamilyHeadline
theme.typography.body2.fontSize = '1rem'
theme.typography.button.fontFamily = fontFamilyHeadline
*/
// override default colors with BMAI colors - end

console.debug('mui.theme', theme)

export default theme as IBmaiTheme
