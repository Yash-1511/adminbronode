import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import 'video-react/dist/video-react.css';
import style from './style';

const index = (props) => {
  const { title, desciption, children, classes } = props;

  return (
    <>
      <Box borderColor="#dedfe0" textAlign="center" borderBottom={1} p={2}>
        <Box fontSize={22} fontWeight="bold">
          {title}
        </Box>
        <Box mt={1}>{desciption}</Box>
      </Box>
      <Box p={2}>{children}</Box>
    </>
  );
};

export default withStyles(style)(index);
