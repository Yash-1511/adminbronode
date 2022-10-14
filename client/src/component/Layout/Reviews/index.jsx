import { Avatar, Box, Grid, withStyles, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import style from './style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../../redux/actions/ReviewsAction';

let countReview = 0;

const index = (props) => {
  const { classes, courseId } = props;
  const [page, setPage] = React.useState(1);
  const [isLoad, setIsLoad] = React.useState(true);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  React.useMemo(() => {
    if (page > 1) {
      dispatch(fetchReviews({ course: courseId, page: page }, true));
    } else {
      dispatch(fetchReviews({ course: courseId, page: page }, false));
    }
  }, [page]);

  React.useMemo(() => {
    if (reviews.length > 0 && countReview === reviews.length) {
      setIsLoad(false);
    } else {
      countReview = reviews.length;
    }
  }, [reviews]);

  return reviews.length > 0 ? (
    <>
      <Box fontSize={18} fontWeight={600} mt={4}>
        Reviews
      </Box>
      {reviews.map((item, i) => (
        <Box
          key={i}
          borderTop={1}
          mt={4}
          fontSize={15}
          pt={2}
          borderColor="#dedfe0"
        >
          <Grid container>
            <Grid item sm={4} xs={12} style={{ display: 'flex' }}>
              <Box
                className={classes.avatar}
                display={{ xs: 'none', sm: 'block' }}
              >
                <Avatar>
                  {item['user']['fristName'].charAt(0).toUpperCase()}
                  {item['user']['lastName'].charAt(0).toUpperCase()}
                </Avatar>
              </Box>
              <Box ml={1} display={{ xs: 'none', sm: 'block' }}>
                <Box color="#686f7a">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Box>
                <Box mt={0.5}>
                  {`${item['user']['fristName']} ${item['user']['lastName']}`}
                </Box>
              </Box>
            </Grid>
            <Grid item sm={8} xs={12} className={classes.contentReview}>
              <Rating
                size="small"
                value={item.rating}
                precision={0.1}
                readOnly
              />
              <Box mt={1.25}>{item.review}</Box>
            </Grid>
          </Grid>
        </Box>
      ))}
      {isLoad && (
        <Box
          borderColor="#dedfe0"
          textAlign="center"
          mt={4}
          pt={3}
          borderTop={1}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
            onClick={() => setPage(page + 1)}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </>
  ) : (
    <Box mt={4} textAlign="center" borderTop={1} borderColor="#dedfe0" pt={2}>
      Chưa có đánh giá nào!!!
    </Box>
  );
};

export default withStyles(style)(index);
