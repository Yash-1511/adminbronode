const drawerWidth = 240;

const style = (theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
    fontWeight: 550,
  },
  textCate: {
    margin: 'auto 0',
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

export default style;
