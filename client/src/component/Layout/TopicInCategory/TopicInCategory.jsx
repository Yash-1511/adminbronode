import { Container, Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import { Link } from 'react-router-dom';

const TopicInCategory = props => {
  const { classes, category } = props;

  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container>
          <Grid item style={{ padding: '13px' }}>
            <Typography className={classes.textFrist} variant="body2">
              {category && category.title}
            </Typography>
          </Grid>
          {category &&
            category['topics'].map(item => (
              <Grid key={item.id} item className={classes.text}>
                <Link
                  className={classes.removeUnderline}
                  to={`/topic/${item.slug}.${item.id}`}
                  variant="body2"
                >
                  {item.title}
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(TopicInCategory);
