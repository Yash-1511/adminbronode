import { fade } from '@material-ui/core';

const style = theme => ({
  root: { padding: '4rem 0' },
  cardContent: {
    position: 'absolute ',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.common.black, 0.5),
    color: theme.palette.common.white
  },
  cardMedia: {
    transition: 'transform .2s',
    '&:hover': { transform: 'scale(1.2)' }
  },
  column: { marginTop: '1.5rem', padding: '0 1rem' }
});

export default style;
