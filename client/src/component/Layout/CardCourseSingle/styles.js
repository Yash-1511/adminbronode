const style = (theme) => ({
  root: {
    width: '100%',
    borderTop: '1px solid #dedfe0',
    padding: '0 4px 16px',
    '&:hover': { backgroundColor: '#f7f8fa' },
    textDecoration: 'none',
    color: 'black',
  },
  image: { height: 135 },
  description: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
});

export default style;
