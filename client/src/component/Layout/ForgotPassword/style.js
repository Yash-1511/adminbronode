const style = (theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
  button: { textTransform: 'none', fontWeight: 'bold' },
});

export default style;
