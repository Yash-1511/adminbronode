import FormCoupon from './FormCoupon';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  withStyles,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import styles from './style';
import { loadSaveCourse, salePayment } from '../../../redux/actions/CartAction';
import { Link, useHistory } from 'react-router-dom';

const index = (props) => {
  const { classes } = props;
  const { cart, save, authentication } = useSelector((state) => ({
    cart: state.cart.cart,
    save: state.cart.save,
    authentication: state.auth.authentication,
  }));
  const dispatch = useDispatch();
  let history = useHistory();
  const [priceSale, setPriceSale] = React.useState(null);
  const [couponID, setCouponID] = React.useState(null);

  const totalPrice = () => {
    let total = 0;
    if (cart) {
      cart.map((item) => {
        if (item.discount) total += item.discount;
        else total += item.price;
      });
    }
    return total;
  };

  const handlePriceSale = (couponId, value) => {
    setCouponID(couponId);
    setPriceSale(totalPrice() - value);
  };

  React.useEffect(() => {
    dispatch(loadSaveCourse());
  }, []);

  const handleCheckout = () => {
    if (!authentication) document.querySelector('#login').click();
    else {
      history.push('/cart/checkout');
      dispatch(
        salePayment(couponID, priceSale ? totalPrice() - priceSale : priceSale)
      );
    }
  };

  return (
    <section className={classes.root}>
      <Container>
        {cart.length > 0 ? (
          <Grid container spacing={2} direction="row-reverse">
            <Grid item sm={4} xs={12}>
              <Box mt={4} fontSize={18} color="#686f7a">
                Tổng:
              </Box>
              <Box
                my={1}
                fontSize={18}
                style={{ textDecoration: 'line-through' }}
              >
                {priceSale &&
                  `${parseFloat(totalPrice()).toLocaleString()} VND`}
              </Box>
              <Box my={1} fontSize={36} fontWeight="bold">
                {`${parseFloat(
                  priceSale ? priceSale : totalPrice()
                ).toLocaleString()} VND`}
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                size="large"
                onClick={handleCheckout}
              >
                Thanh toán
              </Button>
              <Box mt={1} borderColor="#e8e9eb" pt={1} borderTop={1}>
                <FormCoupon total={totalPrice()} priceSale={handlePriceSale} />
              </Box>
            </Grid>
            <Grid item sm={8} xs={12}>
              <Box fontSize={18} mb={1.2}>
                {cart.length} khóa học trong giỏ hàng
              </Box>
              {cart.map((item, i) => (
                <CartItem key={i} course={item} isCart={true} />
              ))}
            </Grid>
          </Grid>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={300}
            border={1}
            borderColor="#dedfe0"
          >
            <Box textAlign="center">
              <ShoppingCartIcon className={classes.icon} />
              <Box fontSize={15} mb={1.4}>
                Giỏ hàng trống. Quay lại trang chủ để thêm khóa học
              </Box>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                component={Link}
                to="/"
              >
                Về trang chủ
              </Button>
            </Box>
          </Box>
        )}
        <Box fontSize={18} mt={2} mb={1}>
          Mua sau
        </Box>
        {save.length > 0 ? (
          save.map((item, i) => (
            <CartItem key={i} course={item} isCart={false} />
          ))
        ) : (
          <Box fontSize={15} color="#686f7a">
            Bạn không lưu khóa học nào để mua sau
          </Box>
        )}
      </Container>
    </section>
  );
};

export default withStyles(styles)(index);
