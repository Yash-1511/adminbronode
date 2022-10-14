const displayInline = { display: 'inline' };

const style = (theme) => ({
  rootUser: {
    '& > *': {
      padding: '.5rem 1rem',
      fontSize: '14px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'black',
      '&:hover': { color: theme.palette.primary.main },
    },
  },
  courseBuy: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': { color: theme.palette.primary.main },
  },
  courseFavorite: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f2f3f5' },
  },
  badge: {
    ...displayInline,
    margin: `auto ${theme.spacing(2)}px`,
    cursor: 'pointer',
    '&:hover': { color: theme.palette.primary.main },
  },
  button: { textTransform: 'none', fontWeight: 'bold' },
  rootLinearProgress: {
    height: 10,
    borderRadius: 3,
    backgroundColor: '#f2f3f5',
  },
  barLinearProgress: {
    borderRadius: 3,
  },
  boxGoStudy: {
    ...displayInline,
    cursor: 'pointer',
    '&:hover': { color: theme.palette.primary.main },
  },
});

export default style;
