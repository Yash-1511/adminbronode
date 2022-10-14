import {
  Box,
  CardMedia,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../../../commons/FormatDuration';
import style from './styles';

const CardCourseSingle = (props) => {
  const { classes, course } = props;

  return (
    <Box
      className={classes.root}
      component={Link}
      to={`/course/${course.slug}.${course._id}`}
    >
      <Grid container style={{ paddingTop: '1rem' }}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            className={classes.image}
            image={course.thumnail}
            title="Live from space album cover"
          />
        </Grid>
        <Grid item container xs={9} style={{ padding: '0 1rem' }}>
          <Grid item xs={6}>
            <Typography
              component="h6"
              variant="subtitle1"
              style={{ fontWeight: 'bold' }}
            >
              {course.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {course.duration ? formatDuration(course.duration) : null}
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.description}
              color="textSecondary"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'end' }}>
            <Typography
              component="h6"
              variant="h6"
              style={{ fontWeight: 'bold' }}
            >
              {course.discount
                ? `${parseFloat(
                    course.discount.priceDiscount
                  ).toLocaleString()} VND`
                : `${parseFloat(course.price).toLocaleString()} VND`}
            </Typography>
            <Typography
              component="h6"
              variant="subtitle1"
              color="textSecondary"
              style={{ textDecoration: 'line-through' }}
            >
              {course.discount
                ? `${parseFloat(course.price).toLocaleString()} VND`
                : null}
            </Typography>
            <Box style={{ display: 'inline-flex' }}>
              <Rating
                name="simple-controlled"
                size="small"
                defaultValue={course.ratingAverage}
                precision={0.5}
                readOnly
              />
              <Typography
                component="h6"
                variant="subtitle2"
                color="textSecondary"
              >
                {course.ratingAverage}
              </Typography>
            </Box>
            <Typography
              component="h6"
              variant="subtitle2"
              color="textSecondary"
            >
              {course.ratingQuantity} ratings
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(style)(CardCourseSingle);
