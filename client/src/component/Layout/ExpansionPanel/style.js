const style = (theme) => ({
  expanded: {},
  rootExpansionPanel: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  rootExpansionPanelSummary: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
  },
  contentExpansionPanelSummary: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  rootExpansionPanelDetails: {
    padding: `12px 60px 12px 24px`,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
  },
  column: {
    flexBasis: '33.33%',
  },
});

export default style;
