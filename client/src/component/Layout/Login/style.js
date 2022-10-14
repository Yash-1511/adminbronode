const button = { textTransform: 'none', justifyContent: 'left' };

const style = (theme) => ({
  button,
  buttonFB: {
    ...button,
    backgroundColor: '#115293',
    '&:hover': { backgroundColor: '#0d447b' },
  },
});

export default style;
