import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  isWidthDown,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import JumbotronDetailCourseMobile from '../JumbotronDetailCourseMobile';
import style from './style';
import {
  fetchAddFavorite,
  fetchRemoveFavorite,
} from '../../../redux/actions/FavoriteAction';

const JumbotronDetailCourse = (props) => {
  const { classes, width } = props;
  const { course, user } = useSelector((state) => ({
    user: state.auth.user,
    course: state.course.courseDetails,
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

  return isWidthDown('sm', width)
    ? Object.keys(course).length > 0 && (
        <JumbotronDetailCourseMobile course={course} user={user} />
      )
    : Object.keys(course).length > 0 && (
        <section className={classes.root}>
          <Container fixed style={{ textAlign: 'end' }}>
            <Box pt={2} style={{ display: 'inline-flex' }}>
              <Box mr={2} my="auto" className={classes.boxGift}>
                <CardGiftcardIcon />
                <Typography variant="subtitle1" display="inline">
                  Tặng khóa học
                </Typography>
              </Box>
              {Object.keys(user).length > 0 &&
                !user.coursesBuy.find(
                  (item) => item.course._id === course._id
                ) && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<FavoriteBorder color="primary" />}
                        onChange={() => changeFavorite(course)}
                        checked={checkFavorite}
                        checkedIcon={<Favorite />}
                      />
                    }
                    label={checkFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
                  />
                )}
            </Box>
            <Box pt={2} pb={8} style={{ textAlign: 'start' }}>
              <Grid container>
                <Grid item md={8}>
                  <Typography variant="h4" gutterBottom>
                    {course.name}
                  </Typography>
                  <Box style={{ display: 'flex' }}>
                    <Rating
                      size="small"
                      value={course.ratingAverage}
                      precision={0.5}
                      readOnly
                    />
                    <Box ml={1}>{course.ratingAverage}</Box>
                    <Box ml={1}>{`(${course.ratingQuantity} ratings)`}</Box>
                    <Box ml={3}>{`${course.studentQuantity} students`}</Box>
                  </Box>
                  <Box mr={3} display="inline">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      display="inline"
                    >
                      Tạo bởi{' '}
                      {`${course.author[0]['fristName']}
                      ${course.author[0]['lastName']}`}
                    </Typography>
                  </Box>
                  <Box display="inline">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      display="inline"
                    >
                      Last update:{' '}
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
      );
};

export default compose(withStyles(style), withWidth())(JumbotronDetailCourse);
