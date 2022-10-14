const button = { textTransform: 'none' };

const style = (theme) => ({
  root: {
    margin: '5rem 0',
  },
  cursor: { cursor: 'pointer', '&:hover': { color: '#003845' } },
  button,
  buttonApply: { ...button, marginTop: '.5rem' },
  thumnail: { width: 64, objectFit: 'cover' },
  icon: { fontSize: 120, color: '#e8e9eb' },
});

export default style;
