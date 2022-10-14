const style = (theme) => ({
  rootLinearProgress: {
    height: 20,
    borderRadius: 3,
    backgroundColor: '#f2f3f5',
  },
  barLinearProgress: {
    borderRadius: 3,
    backgroundColor: '#8a92a3',
  },
  margin: {
    margin: theme.spacing(1),
    width: '50%',
  },
  boxRating: { cursor: 'pointer' },
  hideClear: { display: 'none', cursor: 'pointer' },
});

export default style;
