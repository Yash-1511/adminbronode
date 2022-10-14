const style = (theme) => ({
  root: { padding: '2rem 1.5rem' },
  boxCourse: {
    backgroundColor: 'white',
    borderRadius: 4,
    zIndex: 20,
    padding: '.5rem',
    marginTop: -150,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cover: {
    height: 135,
  },
  textWithIcon: { display: 'flex' },
  btnShare: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { color: 'grey' },
  },
  tabsRoot: {
    borderBottom: '1px solid #b5b5b5',
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
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
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  tabSelected: { color: theme.palette.primary.main },
});

export default style;
