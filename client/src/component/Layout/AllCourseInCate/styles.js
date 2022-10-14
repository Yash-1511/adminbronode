const style = theme => ({
  root: { padding: '2rem 0' },
  title: { fontWeight: 'bold', margin: '1rem 0', width: '100%' },
  sort: {
    backgroundColor: '#F7F8FA',
    width: '100%',
    display: 'flex',
    marginBottom: '1rem'
  },
  pagination: {
    width: '100%',
    textAlign: 'center',
    '& > div': {
      margin: `0 ${theme.spacing(1)}px`
    }
  },
  numberPage: {
    display: 'inline-flex',
    height: '100%',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: '0 3px'
  }
});

export default style;
