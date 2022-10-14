import React from 'react';
import { withStyles, Typography, Container } from '@material-ui/core';
import style from '../Jumbotron/styles';

const Jumbotron = props => {
  const { classes, category } = props;

  return (
    <section className={classes.root}>
      <Container fixed>
        <Typography style={{ padding: '2rem 0' }} variant="h4">
          {category}
        </Typography>
      </Container>
    </section>
  );
};

export default withStyles(style)(Jumbotron);
