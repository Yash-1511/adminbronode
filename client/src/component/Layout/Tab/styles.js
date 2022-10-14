const style = theme => ({
  tabsRoot: {
    borderBottom: '1px solid #b5b5b5'
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1
    },
    '&:focus': {
      color: theme.palette.primary.main
    }
  },
  tabSelected: { color: theme.palette.primary.main }
});

export default style;
