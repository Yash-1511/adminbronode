const style = theme => ({
  rating: { display: 'flex', alignItems: 'center' },
  paper: {
    padding: theme.spacing(1),
    // marginLeft: '0.7rem'
    width: '340px'
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' }
  }
});

export default style;
