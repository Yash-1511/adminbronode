const button = { textTransform: 'none' };

const style = (theme) => ({
  formComent: {
    '& > *': { marginTop: '.5rem' },
  },
  button,
  pagination: {
    width: '100%',
    textAlign: 'center',
    '& > div': {
      margin: `0 ${theme.spacing(1)}px`,
    },
    '& > button': button,
  },
  numberPage: {
    display: 'inline-flex',
    height: '100%',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: '0 3px',
  },
  reply: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1rem',
  },
});

export default style;
