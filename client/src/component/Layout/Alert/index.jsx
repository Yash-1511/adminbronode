import { withStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'redux';
import style from './style';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

const index = (props) => {
  const { classes } = props;
  const { message, status } = useSelector((state) => ({
    message: state.alert.arrMessage,
    status: state.alert.status,
  }));

  return (
    <div className={classes.root}>
      {message.map((item, i) => {
        if (status === 'error') {
          return (
            <Alert key={i} variant="filled" severity="error">
              {item}
            </Alert>
          );
        }
        return (
          <Alert key={i} variant="filled" severity="success">
            {item}
          </Alert>
        );
      })}
    </div>
  );
};

export default compose(withStyles(style))(index);
