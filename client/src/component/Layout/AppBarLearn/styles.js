const styleLink = { color: '#fff', textDecoration: 'none' };

const style = (theme) => ({
  root: {
    flexGrow: 1,
    '& > *': { cursor: 'pointer' },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  boxIcon: {
    display: 'contents',
    marginRight: '1rem',
    '&:hover': { color: '#dedfe0' },
  },
  button: { textTransform: 'none' },
  process: {
    padding: '1rem',
    textAlign: 'center',
    '& > *': { marginTop: '.5rem' },
  },
  colorAppBar: { color: '#fff', backgroundColor: '#29303B' },
  nameCourse: {
    whiteSpace: 'nowrap',
    paddingLeft: '.5rem',
    borderColor: '#fff',
    display: 'inline',
    marginLeft: '.5rem',
    ...styleLink,
  },
  backMyCourse: styleLink,
});

export default style;
