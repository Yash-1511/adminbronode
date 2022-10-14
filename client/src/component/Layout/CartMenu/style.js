const style = (theme) => ({
  badge: {
    margin: `auto ${theme.spacing(2)}px`,
    cursor: 'pointer',
    '&:hover': { color: theme.palette.primary.main },
  },
  buttonCart: { margin: '0.5rem', float: 'right' },
  cartItem: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f2f3f5' },
  },
  titleCourse: {
    width: 238,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
});

export default style;
