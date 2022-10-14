import { fade } from '@material-ui/core';

const style = theme => ({
  banner: {
    backgroundImage: ` url('https://picsum.photos/1200/1000')`,
    backgroundSize: 'cover',
    // width: '100%',
    height: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: '50% 50%',
    padding: '4rem 2rem',
  },
  bannerContent: {
    padding: '2rem',
    height: 'auto',
    background: 'white',
    borderRadius: 10
  }
});

export default style;
