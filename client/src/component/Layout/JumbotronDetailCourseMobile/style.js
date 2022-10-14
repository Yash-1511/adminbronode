const style = (theme) => ({
  root: {
    background: '#29303B',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  displayIcon: {},
  hideIcon: { display: 'none' },
  boxGift: {
    cursor: 'pointer',
    display: 'inherit',
    '&:hover': { color: '#cacbcc' },
  },
  boxCourse: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
  cover: {
    height: 135,
  },
  textWithIcon: { display: 'flex' },
  btnShare: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { color: 'grey' },
  },
});

export default style;
