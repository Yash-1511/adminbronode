import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  withWidth,
  isWidthUp,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import {
  bindHover,
  bindPopover,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Popover from 'material-ui-popup-state/HoverPopover';
import React from 'react';
import styles from './styles';
import { logOut } from '../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { compose } from 'redux';
import { addItemCart } from '../../../redux/actions/CartAction';
import { fetchRemoveFavorite } from '../../../redux/actions/FavoriteAction';

const index = (props) => {
  const { classes, width } = props;
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({
    cart: state.cart.cart,
    user: state.auth.user,
  }));

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const popupState1 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const popupState2 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const signOut = () => {
    dispatch(logOut());
  };

  const addCoureCart = (course) => {
    const { id, createBy, name, price, thumnail, slug, discount } = course;
    const newCourse = { id, createBy, name, price, thumnail, slug, discount };

    dispatch(addItemCart(newCourse, user.id));
    dispatch(fetchRemoveFavorite(course));
  };

  const calcProccess = (section, proccess = null) => {
    if (proccess) {
      let totalLecture = section.reduce((result, item) => {
        return result + item.content.length;
      }, 0);
      return Math.round((proccess.length * 100) / totalLecture);
    }

    return 0;
  };

  return (
    Object.keys(user).length > 0 && (
      <>
        {isWidthUp('lg', width) && (
          <>
            <Badge
              color="secondary"
              {...bindHover(popupState)}
              className={classes.badge}
              variant="dot"
              invisible={user['favoriteCourse'].length > 0 ? false : true}
            >
              <FavoriteBorderRoundedIcon />
            </Badge>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              PaperProps={{
                style: { width: 286 },
              }}
            >
              {user['favoriteCourse'].limit(3).map(({ course }, i) => (
                <Card
                  key={i}
                  variant="outlined"
                  className={classes.courseFavorite}
                >
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={4} sm={4}>
                        <ButtonBase className={classes.image}>
                          <img
                            className={classes.img}
                            width={64}
                            height={64}
                            alt="complex"
                            src={course.thumnail}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={8} sm={8} container>
                        <Typography noWrap>{course.name}</Typography>
                        <Box mr={1} fontWeight="bold" fontSize={14}>
                          {course.discount
                            ? `${parseFloat(
                                course.discount.priceDiscount
                              ).toLocaleString()} VND`
                            : `${parseFloat(
                                course.price
                              ).toLocaleString()} VND`}
                        </Box>
                        <Box
                          fontSize={12}
                          style={{ textDecoration: 'line-through' }}
                          display="inline"
                        >
                          {course.discount
                            ? `${parseFloat(course.price).toLocaleString()} VND`
                            : null}
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={() => addCoureCart(course)}
                        className={classes.button}
                      >
                        Thêm giỏ hàng
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Box m={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.button}
                  component={Link}
                  to="/my-courses"
                >
                  Danh sách yêu thích
                </Button>
              </Box>
            </Popover>
          </>
        )}
        {isWidthUp('md', width) && (
          <>
            <Box
              my="auto"
              mr={2}
              {...bindHover(popupState1)}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              className={classes.boxGoStudy}
            >
              Vào học
            </Box>
            <Popover
              {...bindPopover(popupState1)}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              PaperProps={{
                style: { width: 286 },
              }}
            >
              {user['coursesBuy'].length > 0 ? (
                user['coursesBuy'].limit(3).map((item, i) => (
                  <Card
                    variant="outlined"
                    key={i}
                    className={classes.courseBuy}
                    component={Link}
                    to={`/course/${item.course.slug}.${item.course._id}`}
                  >
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={4} sm={4}>
                          <ButtonBase className={classes.image}>
                            <img
                              className={classes.img}
                              width={64}
                              height={64}
                              alt="complex"
                              src={item.course.thumnail}
                            />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={8} sm={8}>
                          <Typography style={{ fontWeight: 'bold' }} noWrap>
                            {item.course.name}
                          </Typography>
                          <Box mt={2}>
                            <LinearProgress
                              classes={{
                                root: classes.rootLinearProgress,
                                bar: classes.barLinearProgress,
                              }}
                              variant="determinate"
                              value={calcProccess(
                                item.course.section,
                                item.proccess
                              )}
                            />
                          </Box>
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
              <Box p={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.button}
                  component={Link}
                  to="/my-courses"
                >
                  Vào học
                </Button>
              </Box>
            </Popover>
            <Avatar
              {...bindHover(popupState2)}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              style={{ display: 'inline-flex' }}
              src={user.photo}
            >
              {`${user.fristName.charAt(0)}${user.lastName.charAt(0)}`}
            </Avatar>
            <Popover
              {...bindPopover(popupState2)}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              PaperProps={{
                style: { width: 286 },
              }}
            >
              <Box p={1} className={classes.rootUser}>
                <Box component={Link} display="block" to="/my-courses">
                  Vào học
                </Box>
                <Box component={Link} display="block" to="/my-courses">
                  Yêu thích
                </Box>
                <Box component={Link} display="block" to="/cart">
                  Giỏ hàng
                </Box>
              </Box>
              <Box
                p={1}
                pt={0}
                borderTop={1}
                borderColor="#dedfe0"
                className={classes.rootUser}
              >
                <Box component={Link} to="/user/edit-acount">
                  Cập nhật hồ sơ
                </Box>
                <Box onClick={signOut}>Đăng xuất</Box>
              </Box>
            </Popover>
          </>
        )}
      </>
    )
  );
};
export default compose(withStyles(styles), withWidth())(index);
