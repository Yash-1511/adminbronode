const style = (theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textWithIcon: { display: 'flex' },
  boxAvatar: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  popularInstructor: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 0 1rem'
    },
  },
});

export default style;
