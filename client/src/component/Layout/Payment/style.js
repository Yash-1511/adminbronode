const button = { textTransform: 'none' };

const style = (theme) => ({
  root: {
    margin: '2.5rem 0',
  },
  course: { '& > *': { marginRight: '.5rem', padding: '10px 0' } },
  button,
});

export default style;
