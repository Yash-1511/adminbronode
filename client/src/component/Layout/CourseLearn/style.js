const style = (theme) => ({
  closeContent: { cursor: 'pointer' },
  expansionSumary: { backgroundColor: '#f7f8fa' },
  label: { fontSize: 14 },
  padding: { padding: '0px 24px 12px 24px' },
  buttonContent: {
    textTransform: 'none',
    position: 'absolute',
    right: 0,
    top: '80px',
    zIndex: 3,
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
