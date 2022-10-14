import {
  Badge,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
  withStyles,
  Box,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import styles from './style';
import Popover from 'material-ui-popup-state/HoverPopover';
import {
  usePopupState,
  bindHover,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemCart, loadCart } from '../../../redux/actions/CartAction';
import { Link } from 'react-router-dom';

const CartMenu = (props) => {
  const { classes } = props;
  const { cart, user } = useSelector((state) => ({
    cart: state.cart.cart,
    user: state.auth.user,
  }));
  const dispatch = useDispatch();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const removeCourseCart = (id) => {
    dispatch(removeItemCart(id));
  };

  React.useEffect(() => {
    dispatch(loadCart());
  }, []);

  return (
    <React.Fragment>
      <Badge
        badgeContent={cart && cart.length}
        color="secondary"
        {...bindHover(popupState)}
        className={classes.badge}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
      >
        <ShoppingCartIcon />
      </Badge>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          style: { width: 400 },
        }}
      >
        {cart.length > 0 ? (
          cart.map((item) => (
            <Card variant="outlined" key={item.id} className={classes.cartItem}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase
                      className={classes.image}
                      component={Link}
                      to={`/course/${item.slug}.${item.id}`}
                    >
                      <img
                        className={classes.img}
                        width={64}
                        height={64}
                        alt="complex"
                        src={item.thumnail}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs wrap="nowrap" container direction="column">
                      <Grid
                        item
                        xs
                        component={Link}
                        to={`/course/${item.slug}.${item.id}`}
                        className={classes.titleCourse}
                      >
                        <Typography noWrap>{item.name}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        {item.discount
                          ? `${parseFloat(
                              item.discount.priceDiscount
                            ).toLocaleString()} VND`
                          : `${parseFloat(item.price).toLocaleString()} VND`}
                      </Typography>
                      <Typography
                        onClick={() => removeCourseCart(item.id)}
                        variant="body2"
                        style={{ cursor: 'pointer' }}
                      >
                        Xóa
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box my={2} textAlign="center">
            Chưa có khóa học nào
          </Box>
        )}
        <Button
          className={classes.buttonCart}
          variant="outlined"
          color="primary"
          component={Link}
          to="/cart"
        >
          Xem Giỏ Hàng
        </Button>
      </Popover>
    </React.Fragment>
  );
};

export default withStyles(styles)(CartMenu);
