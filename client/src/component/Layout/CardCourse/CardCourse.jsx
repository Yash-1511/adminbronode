import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
  withStyles,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import {
  bindHover,
  bindPopover,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Popover from 'material-ui-popup-state/HoverPopover';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
import { formatDuration } from '../../../commons/FormatDuration';
import { useDispatch, useSelector } from 'react-redux';
import { addItemCart } from '../../../redux/actions/CartAction';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../../redux/actions/FavoriteAction';

const CardCourse = (props) => {
  const { classes, course } = props;
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({
    cart: state.cart.cart,
    user: state.auth.user,
  }));

  const addCoureCart = (course) => {
    const { id, createBy, name, price, thumnail, slug, discount } = course;
    const newCourse = { id, createBy, name, price, thumnail, slug, discount };

    dispatch(addItemCart(newCourse, user.id));
  };

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
    <React.Fragment>
      <Card
        {...bindHover(popupState)}
        style={{ marginRight: 20 }}
        variant="outlined"
      >
        <CardActionArea
          component={Link}
          to={`/course/${course.slug}.${course._id}`}
        >
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            width="240"
            height="115"
            image={course.thumnail}
          />
          <CardContent>
            <Typography noWrap variant="h6" component="h2">
              {course.name}
            </Typography>
            <Typography
              variant="body2"
              noWrap
              color="textSecondary"
              component="p"
            >
              {`${course.createBy.fristName} ${course.createBy.lastName}`}
            </Typography>
            <Box className={classes.rating}>
              <Rating
                name="simple-controlled"
                size="small"
                defaultValue={course.ratingAverage}
                precision={0.5}
                readOnly
              />
              <Box ml={1}>{course.ratingAverage}</Box>
              <Box ml={1}>({course.studentQuantity})</Box>
            </Box>{' '}
            <h3 style={{ marginBottom: 0 }}>
              {parseFloat(course.price).toLocaleString()} VND
            </h3>
          </CardContent>
        </CardActionArea>
      </Card>
      <Popover
        {...bindPopover(popupState)}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <Typography
          variant="h6"
          component={Link}
          to={`/course/${course.slug}.${course._id}`}
          className={classes.link}
        >
          {course.name}
        </Typography>
        <Typography variant="subtitle2">
          Last update: {new Date(course.updatedAt).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2">
          {course.duration ? formatDuration(course.duration) : null}
        </Typography>
        <Typography
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
        <Typography
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: course.learningWhat }}
        />
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {Object.keys(user).length > 0 &&
          user['coursesBuy'].findIndex(
            (item) => item.course._id === course._id
          ) !== -1 ? (
            <Box mt={0.5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                size="large"
                component={Link}
                to={`/course/${course.slug}.${course._id}/learn`}
              >
                Vào học
              </Button>
            </Box>
          ) : (
            <>
              {cart.length > 0 &&
              cart.find((item) => item.id === course._id) ? (
                <Box mt={0.5} mr={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    component={Link}
                    to="/cart"
                    size="large"
                  >
                    Đến Giỏ Hàng
                  </Button>
                </Box>
              ) : (
                <Box mt={0.5} mr={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => addCoureCart(course)}
                    size="large"
                  >
                    Thêm Giỏ Hàng
                  </Button>
                </Box>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={() => changeFavorite(course)}
                    checked={checkFavorite}
                  />
                }
              />
            </>
          )}
        </Grid>
      </Popover>
    </React.Fragment>
  );
};

export default withStyles(styles)(CardCourse);
