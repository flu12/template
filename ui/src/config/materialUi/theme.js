import { createMuiTheme } from '@material-ui/core/styles';

const COLORS = {
  PRIMARY: {
    light: '#938E94',
    main: '#141435',
  },
  SECONDARY: {
    light: '#f9db87',
    main: '#c3996b',
    dark: '#926a3e',
  },
};

export const theme = createMuiTheme({
  palette: {
    primary: { ...COLORS.PRIMARY },
    secondary: { ...COLORS.SECONDARY },
    typography: {
      fontFamily: 'Raleway, Arial',
      useNextVariants: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 16,
        textTransform: 'none',
      },
      containedSecondary: {
        '& *': {
          color: '#FFFFFF'
        },
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
        minWidth: '40vh',
        maxWidth: '96%',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '0.825rem',
        textAlign: 'center',
      },
    },
  }
});
