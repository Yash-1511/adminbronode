import { fade } from '@material-ui/core/styles';

const style = (theme) => ({
  button: { textTransform: 'none' },
  drawerPaper: {
    width: '25vw',
    [theme.breakpoints.down('sm')]: {
      width: '50vw',
    },
  },
});

export default style;
