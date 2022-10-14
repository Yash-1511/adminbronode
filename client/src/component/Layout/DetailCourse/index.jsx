import { Box, Button, CardMedia, Container, Grid, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDuration } from '../../../commons/FormatDuration';
import { addItemCart } from '../../../redux/actions/CartAction';
import ExpansionPanel from '../ExpansionPanel';
import Feedback from '../Feedback';
import InfoIntructor from '../InfoIntructor';
import Reviews from '../Reviews';
import TabPanel from '../TabPanel/TabPanel';
import style from './style';

const DetailCourse = (props) => {
  const { classes } = props;
  const [value, setValue] = React.useState(0);
  const classesTabs = {
    root: classes.tabRoot,
    selected: classes.tabSelected,
  };
  const { course, user, cart } = useSelector((state) => ({
    course: state.course.courseDetails,
    cart: state.cart.cart,
    user: state.auth.user,
  }));
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addCoureCart = (course) => {
    const { id, createBy, name, price, thumnail, slug, discount } = course;
    const newCourse = { id, createBy, name, price, thumnail, slug, discount };

    dispatch(addItemCart(newCourse, user.id));
  };

  return (
    Object.keys(course).length > 0 && (
      <section>
        <Container fixed className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={8} xs={12}>
              <Box
                mb={2}
                bgcolor="#F9F9F9"
                px="15px"
                py="10px"
                border={1}
                borderColor="#dedfe0"
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  Bạn sẽ học được gì?
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      className={classes.textWithIcon}
                      dangerouslySetInnerHTML={{
                        __html: course.learningWhat,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Tabs
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator,
                }}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab disableRipple classes={classesTabs} label="Giới thiệu" />
                <Tab disableRipple classes={classesTabs} label="Nội dung" />
                <Tab disableRipple classes={classesTabs} label="Giảng viên" />
                <Tab disableRipple classes={classesTabs} label="Đánh giá" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Typography
                  variant="subtitle2"
                  dangerouslySetInnerHTML={{ __html: course.detailDescription }}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ExpansionPanel content={course.section} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <InfoIntructor instructor={course.author[0]} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Feedback
                  ratingAverage={course.ratingAverage}
                  reviews={course.reviews}
                />
                <Reviews courseId={course._id} />
              </TabPanel>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box className={classes.boxCourse} boxShadow={2}>
                <CardMedia
                  component="img"
                  className={classes.cover}
                  image={course.thumnail}
                />
                <Box py={2} px={4.3}>
                  <Box
                    color="#505763"
                    fontWeight="fontWeightBold"
                    fontSize={29}
                    marginRight={1.25}
                  >
                    {course.discount
                      ? `${parseFloat(
                          course.discount.priceDiscount
                        ).toLocaleString()} VND`
                      : `${parseFloat(course.price).toLocaleString()} VND`}
                  </Box>
                  <Box
                    color="text.secondary"
                    fontSize={18}
                    style={{ textDecoration: 'line-through' }}
                  >
                    {course.discount
                      ? `${parseFloat(course.price).toLocaleString()} VND`
                      : null}
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
                  ) : (
                    <>
                      {cart.length > 0 &&
                      cart.find((item) => item.id === course._id) ? (
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
                      <Box mt={1}>
                        <Button
                          variant="outlined"
                          fullWidth
                          disableElevation
                          size="large"
                        >
                          Mua Ngay
                        </Button>
                      </Box>
                    </>
                  )}
                  <Box mt={1} color="text.secondary">
                    <Typography variant="subtitle1">
                      Khóa học bao gồm:
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.textWithIcon}
                    >
                      <OndemandVideoIcon
                        style={{ marginRight: '.5rem' }}
                        fontSize="small"
                      />
                      {course.duration ? formatDuration(course.duration) : null}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.textWithIcon}
                    >
                      <AllInclusiveIcon
                        style={{ marginRight: '.5rem' }}
                        fontSize="small"
                      />
                      Truy cập trọn đời
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.textWithIcon}
                    >
                      <PhoneIphoneIcon
                        style={{ marginRight: '.5rem' }}
                        fontSize="small"
                      />
                      Truy cập trên smartphone
                    </Typography>
                  </Box>
                  <Box
                    py={2}
                    mt={2}
                    borderColor="text.secondary"
                    borderTop={1}
                    color="success.main"
                    className={classes.btnShare}
                  >
                    <ShareIcon fontSize="small" /> Share
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    )
  );
};

export default withStyles(style)(DetailCourse);
