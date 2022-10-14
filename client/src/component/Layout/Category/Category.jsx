import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import styles from './styles';
import TitleSection from '../TitleSection/TitleSection.jsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Category = (props) => {
  const { classes } = props;
  const category = useSelector((state) => state.category.category);

  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container>
          <TitleSection title="Top Danh Mục" />
          {category &&
            category.map((cate) => (
              <Grid
                container
                item
                xs={12}
                lg={3}
                md={6}
                key={cate._id}
                className={classes.column}
                component={Link}
                to={`/category/${cate.slug}.${cate._id}`}
              >
                <Card>
                  <CardActionArea className={classes.cardMedia}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image="https://picsum.photos/1200/1000"
                      title="Contemplative Reptile"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: 'bold' }}
                      >
                        {cate.title}
                      </Typography>
                      <Chip label="Hơn 50 khóa học" clickable color="primary" />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(Category);
