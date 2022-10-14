import {
  Box,
  Card,
  CardContent,
  CardMedia,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import styles from './style';
import { useDispatch } from 'react-redux';
import {
  removeItemCart,
  addItemSaveCourse,
  addItemCart,
  removeItemSaveCourse,
} from '../../../redux/actions/CartAction';

const CartMenu = (props) => {
  const { classes, course, isCart } = props;
  const dispatch = useDispatch();

  const removeItem = (id) => {
    if (isCart) dispatch(removeItemCart(id));
    else dispatch(removeItemSaveCourse(id));
  };

  const addItem = (course) => {
    if (isCart) {
      dispatch(removeItemCart(course.id));
      dispatch(addItemSaveCourse(course));
    } else {
      dispatch(addItemCart(course));
      dispatch(removeItemSaveCourse(course.id));
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex">
          <Box pr={1} flexGrow={0}>
            <CardMedia
              component="img"
              height="64"
              className={classes.thumnail}
              image={course.thumnail}
            />
          </Box>
          <Box mx={1} pr={1} flexGrow={2} width="50%">
            <Box fontSize={15} fontWeight="bold">
              {course.name}
            </Box>
            <Box fontSize={13} color="#686f7a" mt={0.5}>
              {course.createBy.fristName} {course.createBy.lastName}
            </Box>
          </Box>
          <Box
            pr={1}
            flexGrow={1}
            display={{ xs: 'none', sm: 'none', md: 'block' }}
          >
            <Box
              fontSize={13}
              color="#007791"
              className={classes.cursor}
              textAlign="end"
              onClick={() => removeItem(course.id)}
            >
              Xóa
            </Box>
            <Box
              fontSize={13}
              color="#007791"
              className={classes.cursor}
              textAlign="end"
              onClick={() => addItem(course)}
            >
              {isCart ? 'Thanh toán sau' : 'Thêm giỏ hàng'}
            </Box>
          </Box>
          <Box pr={1} flexGrow={1}>
            <Box
              fontSize={15}
              color="primary.main"
              fontWeight="bold"
              textAlign="end"
            >
              {course.discount
                ? `${parseFloat(
                    course.discount.priceDiscount
                  ).toLocaleString()} VND`
                : `${parseFloat(course.price).toLocaleString()} VND`}
            </Box>
            <Box
              style={{ textDecoration: 'line-through' }}
              mt={0.5}
              fontSize={15}
              color="#686f7a"
              textAlign="end"
            >
              {course.discount
                ? `${parseFloat(course.price).toLocaleString()} VND`
                : null}
            </Box>
          </Box>
        </Box>
        <Box mt={1} textAlign="end" display={{ md: 'none' }}>
          <Box
            mr={1}
            fontSize={13}
            color="#007791"
            display="inline"
            className={classes.cursor}
            onClick={() => removeItem(course.id)}
          >
            Xóa
          </Box>
          <Box
            display="inline"
            fontSize={13}
            color="#007791"
            className={classes.cursor}
            onClick={() => addItem(course)}
          >
            {isCart ? 'Thanh toán sau' : 'Thêm giỏ hàng'}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CartMenu);
