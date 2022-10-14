import React from 'react';
import styles from './styles';
import { Grid, Typography, Box, withStyles } from '@material-ui/core';

const TitleSection = props => {
  const { classes, title } = props;

  return (
    <React.Fragment>
      <Grid container item xs={12} justify="center">
        <Typography className={classes.textCate} variant="h5" component="h2">
          {title}
        </Typography>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Box className={classes.bottomLine} />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(TitleSection);
