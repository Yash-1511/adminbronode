import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  withStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { resConnector } from '../../../commons/CustomAxios';
import styles from './style';

const index = (props) => {
  const { classes } = props;
  const { cart, user, sale } = useSelector((state) => ({
    cart: state.cart.cart,
    user: state.auth.user,
    sale: state.cart.sale,
  }));
  const dispatch = useDispatch();
  const [valueRadio, setValueRadio] = React.useState('vnPay');

  const handleChange = (event) => {
    setValueRadio(event.target.value);
  };

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

  const totalSale = () => (sale ? totalPrice() - sale.price : totalPrice());

  const clickPayment = async () => {
    try {
      const response = await resConnector({
        url: `/payment/checkout/`,
        method: 'post',
        data: {
          amount: parseFloat(totalSale()).toLocaleString(),
          email: user.email,
          phoneNumber: '1234567890',
          paymentMethod: 'vnPay',
          cart,
          userID: user._id,
          coupon: sale && sale.couponID,
        },
      });
      localStorage.removeItem('cart');
      location.href = response.data;
    } catch ({ response }) {
      console.log('err', response);
    }
  };

  return (
    <section className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={8} sm={12} xs={12}>
            <Box fontSize={24} fontWeight="bold" mb={2}>
              Phương thức thanh toán
            </Box>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={valueRadio}
              onChange={handleChange}
            >
              <FormControlLabel
                value="vnPay"
                control={<Radio />}
                label="VnPay"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="One Pay(Sắp có)"
              />
            </RadioGroup>
            <Box fontSize={24} mt={2} fontWeight="bold" mb={2}>
              Chi tiết đơn hàng
            </Box>
            {cart.length > 0 &&
              cart.map((item, i) => (
                <Box key={i} display="flex" className={classes.course}>
                  <Box flexGrow={0} width={64} height={64}>
                    <CardMedia
                      component="img"
                      className={classes.thumnail}
                      image={item.thumnail}
                    />
                  </Box>
                  <Box flexGrow={1} width="50%" fontSize={14} fontWeight="bold">
                    {item.name}
                  </Box>
                  <Box flexGrow={0} fontSize={15}>
                    {item.discount
                      ? `${parseFloat(
                          item.discount.priceDiscount
                        ).toLocaleString()} VND`
                      : `${parseFloat(item.price).toLocaleString()} VND`}
                    <Box mt={0.5} style={{ textDecoration: 'line-through' }}>
                      {item.discount
                        ? `${parseFloat(item.price).toLocaleString()} VND`
                        : null}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <Box border={1} p={3} borderColor="#e8e9eb">
              <Box pb={2} fontSize={24} fontWeight="bold">
                Đơn hàng
              </Box>
              <Box display="flex" fontSize={16}>
                <Box flexGrow={1}>Giá gốc:</Box>
                <Box>
                  {cart.length > 0 &&
                    `${parseFloat(totalPrice()).toLocaleString()} VND`}
                </Box>
              </Box>
              {sale && (
                <Box mt={0.5} display="flex" fontSize={16}>
                  <Box flexGrow={1}>Giảm giá:</Box>
                  <Box>-{parseFloat(sale.price).toLocaleString()} VND</Box>
                </Box>
              )}
              <Box
                my={2}
                pt={1}
                borderColor="#cacbcc"
                borderTop={1}
                display="flex"
                fontSize={16}
              >
                <Box flexGrow={1}>Tổng:</Box>
                <Box fontWeight="bold" fontSize={19}>
                  {cart.length > 0 &&
                    `${parseFloat(totalSale()).toLocaleString()} VND`}
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                onClick={clickPayment}
              >
                Thanh Toán
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(index);
