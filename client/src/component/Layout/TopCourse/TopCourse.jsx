import { Container, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../Tab/Tab.jsx';
import TitleSection from '../TitleSection/TitleSection.jsx';
import styles from './styles';

const TopCourse = props => {
  const { classes } = props;
  const course = useSelector(state => state.category.category);

  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container>
          <TitleSection title="Top Khóa Học" />
          <Grid item xs={12} style={{ marginTop: '3rem' }}>
            <Tab course={course} />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(TopCourse);
