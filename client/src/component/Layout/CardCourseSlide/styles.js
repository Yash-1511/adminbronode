const style = (theme) => ({
  root: {
    display: 'flex',
    padding: '1rem 1rem',
    textDecoration: 'none',
  },
  cover: {
    height: 'auto',
  },
  button: { marginTop: '.5rem', textTransform: 'none' },
  description: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  divCover: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
