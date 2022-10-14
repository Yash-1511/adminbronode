import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
  withStyles,
  Container,
} from '@material-ui/core';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ShareIcon from '@material-ui/icons/Share';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { compose } from 'redux';
import style from './style';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import { addItemCart } from '../../../redux/actions/CartAction';
import {
  fetchAddFavorite,
  fetchRemoveFavorite,
} from '../../../redux/actions/FavoriteAction';

const JumbotronDetailCourse = (props) => {
  const { classes, course, user } = props;
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));
  const dispatch = useDispatch();

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
    if (!checkFavorite) {
      dispatch(fetchAddFavorite(course));
      return;
    }
    dispatch(fetchRemoveFavorite(course));
  };

  return (
    <section>
      <Container fixed>
        <CardMedia component="img" image={course.thumnail} />
        <Box mt={1.6}>
          <Box fontSize={24} fontWeight={700}>
            {course.name}
          </Box>
          <Box fontSize={14} style={{ display: 'flex' }} my={1}>
            <Box mr={1} color="#be5a0e" fontWeight={700}>
              {course.ratingAverage}
            </Box>
            <Rating
              name="simple-controlled"
              size="small"
              defaultValue={course.ratingAverage}
              precision={0.5}
              readOnly
            />
            <Box ml={1}>{`(${course.ratingQuantity} ratings)`}</Box>
            <Box ml={3}>{`${course.studentQuantity} students`}</Box>
          </Box>
          <Box fontSize={14}>
            Create by{' '}
            <Box
              display="inline"
              color="primary.main"
              component={Link}
              to={`/user/${course.author[0]['_id']}`}
              style={{ textDecoration: 'none' }}
            >
              {`${course.author[0]['fristName']} ${course.author[0]['lastName']}`}
            </Box>
          </Box>
          <Box my={1}>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <OndemandVideoIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              8 giờ học
            </Typography>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <AllInclusiveIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              Truy cập trọn đời
            </Typography>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <PhoneIphoneIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              Truy cập trên smartphone
            </Typography>
          </Box>
          <Box mb={1.6}>
            <Box
              display="inline"
              color="#505763"
              fontWeight="fontWeightBold"
              fontSize={19}
              marginRight={1.25}
            >
              {course.discount
                ? `${parseFloat(
                    course.discount.priceDiscount
                  ).toLocaleString()} VND`
                : `${parseFloat(course.price).toLocaleString()} VND`}
            </Box>
            <Box
              display="inline"
              color="text.secondary"
              fontSize={14}
              style={{ textDecoration: 'line-through' }}
            >
              {course.discount
                ? `${parseFloat(course.price).toLocaleString()} VND`
                : null}
            </Box>
          </Box>
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
          ) : cart.length > 0 && cart.find((item) => item.id === course._id) ? (
            <Box mt={0.5}>
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
            <Box mt={0.5}>
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
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  disableElevation
                  style={{ textTransform: 'none' }}
                  endIcon={
                    checkFavorite ? <Favorite /> : <FavoriteBorderRoundedIcon />
                  }
                  onClick={() => changeFavorite(course)}
                >
                  {checkFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  style={{ textTransform: 'none' }}
                  fullWidth
                  variant="outlined"
                  disableElevation
                >
                  Tặng khóa học
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ textTransform: 'none' }}
                  fullWidth
                  variant="outlined"
                  disableElevation
                  endIcon={<ShareIcon />}
                >
                  Chia sẻ
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default compose(withStyles(style))(JumbotronDetailCourse);
