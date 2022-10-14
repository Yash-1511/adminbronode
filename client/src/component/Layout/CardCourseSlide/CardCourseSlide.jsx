import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDuration } from '../../../commons/FormatDuration';
import style from './styles';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../../redux/actions/FavoriteAction';

const CardCourseSingle = (props) => {
  const { classes, course } = props;
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));
  const dispatch = useDispatch();

  const checkFavorite =
    Object.keys(user).length > 0 &&
    user['favoriteCourse'].findIndex(
      (item) => item.course._id === course._id
    ) !== -1
      ? true
      : false;

  const changeFavorite = (course) => {
    if (event.target.checked) {
      dispatch(fetchAddFavorite(course));
      return;
    }
    dispatch(fetchRemoveFavorite(course));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={4} className={classes.divCover}>
          <CardMedia
            component="img"
            className={classes.cover}
            image={course.thumnail}
            title="Live from space album cover"
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container justify="space-between" style={{ display: 'flex' }}>
            <Grid item xs={11}>
              <Typography
                component="h6"
                variant="subtitle1"
                style={{ fontWeight: 'bold' }}
                noWrap
              >
                {course.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {Object.keys(user).length > 0 &&
                user['coursesBuy'].findIndex(
                  (item) => item.course._id === course._id
                ) === -1 && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<FavoriteBorder />}
                        onChange={() => changeFavorite(course)}
                        checked={checkFavorite}
                        checkedIcon={<Favorite />}
                      />
                    }
                  />
                )}
            </Grid>
          </Grid>
          <Typography variant="subtitle2" color="textSecondary">
            {new Date(course.updatedAt).toLocaleDateString()}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle2" color="textSecondary">
              {course.duration ? formatDuration(course.duration) : null}
            </Typography>
            <Box ml={3}>
              <Rating
                name="simple-controlled"
                size="small"
                defaultValue={course.ratingAverage}
                precision={0.5}
                readOnly
              />
            </Box>
            <Box ml={1}>{course.ratingAverage}</Box>
            <Box ml={1}>{`(${course.ratingQuantity} ratings)`}</Box>
          </div>
          <Typography
            className={classes.description}
            variant="body1"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
            component={Link}
            to={`/course/${course.slug}.${course._id}`}
          >
            Khám phá
          </Button>
          <Typography
            align="right"
            component="h6"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >
            {parseFloat(course.price).toLocaleString()} VND
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(style)(CardCourseSingle);
