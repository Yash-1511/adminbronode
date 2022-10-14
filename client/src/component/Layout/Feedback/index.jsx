import { Box, Grid, LinearProgress, withStyles } from '@material-ui/core';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import style from './style';
import { fetchReviews } from '../../../redux/actions/ReviewsAction';
import { useDispatch } from 'react-redux';

const index = (props) => {
  const { classes, ratingAverage, reviews } = props;
  const dispatch = useDispatch();
  let query = {
    course: reviews[0]['course'],
    page: 1,
  };

  const filterRating = (i) => {
    const click = -i + 5;
    const array = [1, 2, 3, 4, 5];
    const newquery =
      click !== 5
        ? {
            ...query,
            'rating[gte]': click,
            'rating[lt]': -i + 6,
          }
        : {
            ...query,
            rating: 5,
          };
    array.forEach((item) => {
      if (item !== click) {
        document.querySelector(`.boxRating${item}`).style.opacity = 0.25;
        document.querySelector(`.boxRating${click}`).style.opacity = 1;
        document.querySelector(`.clearBoxRating${click}`).style.display =
          'flex';
        document.querySelector(`.clearBoxRating${item}`).style.display = 'none';
      }
    });
    dispatch(fetchReviews(newquery, false));
  };

  const clearFilter = (i) => {
    const click = -i + 5;
    const array = [1, 2, 3, 4, 5];
    document.querySelector(`.clearBoxRating${click}`).style.display = 'none';
    array.forEach((item) => {
      if (item !== click)
        document.querySelector(`.boxRating${item}`).style.opacity = 1;
    });
    dispatch(fetchReviews(query, false));
  };

  const percentRating = (i) => {
    let count = reviews.filter((item) =>
      i !== 5 ? item.rating >= i && item.rating < i + 1 : item.rating === i
    );

    return Math.round((count.length * 100) / reviews.length);
  };

  return (
    <>
      <Box fontSize={22} fontWeight={600} mb={2}>
        Học sinh đánh giá
      </Box>
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Box textAlign="center" fontSize={72} fontWeight={500}>
            {ratingAverage}
          </Box>
          <Box display="flex" justifyContent="center">
            <Rating
              name="half-rating-read"
              defaultValue={ratingAverage}
              precision={0.1}
              readOnly
            />
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          {Array.from(new Array(5)).map((_, i) => (
            <Box display="flex" key={i}>
              <LinearProgress
                classes={{
                  root: classes.rootLinearProgress,
                  bar: classes.barLinearProgress,
                }}
                className={`${classes.margin} ${classes.boxRating} boxRating${
                  -i + 5
                }`}
                variant="determinate"
                onClick={() => filterRating(i)}
                value={percentRating(-i + 5)}
              />
              <Box
                my="auto"
                mx={0}
                display="flex"
                onClick={() => filterRating(i)}
                className={`boxRating${-i + 5} ${classes.boxRating}`}
              >
                <Rating name="read-only" value={-i + 5} readOnly size="small" />
                <Box my="auto" mx={1}>
                  {percentRating(-i + 5) + '%'}
                </Box>
              </Box>
              <Box
                mx={0}
                my={0.5}
                className={`clearBoxRating${-i + 5}  ${classes.hideClear}`}
              >
                <ClearRoundedIcon onClick={() => clearFilter(i)} />
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(style)(index);
