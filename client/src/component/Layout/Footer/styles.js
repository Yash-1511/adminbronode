import { fade } from '@material-ui/core';

const style = theme => ({
  root: { backgroundColor: '#1E2022', padding: '5rem 0 ' },
  title: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
    marginBottom: '1rem',
    display: 'inline-block',
    height: 50,
    boxShadow: `0 25px 0 -23px ${theme.palette.primary.main}`
  },
  content: {
    color: fade('#fff', 0.6),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': { color: theme.palette.primary.main }
  },
  input: { backgroundColor: 'white' }
});

export default style;
