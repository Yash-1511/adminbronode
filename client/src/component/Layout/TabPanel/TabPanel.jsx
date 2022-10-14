import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ paddingTop: '2.4rem' }}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
};

export default withStyles(styles)(TabPanel);
