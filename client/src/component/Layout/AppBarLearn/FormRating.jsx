import { Box, Button, TextField, withStyles } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import styles from './styles';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import { compose } from 'redux';
import validate from './validate';
import { reduxForm, Field } from 'redux-form';
import { useDispatch } from 'react-redux';
import { addReview, editReview } from '../../../redux/actions/ReviewsAction';
import Alert from '../Alert';

const FormRating = (props) => {
  const {
    handleSubmit,
    invalid,
    submitting,
    classes,
    change,
    review,
    courseID,
  } = props;
  const [rating, setRating] = React.useState(1);
  const dispatch = useDispatch();

  const changeRating = (e, value) => {
    setRating(value);
  };

  const submitForm = async (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        data[key] = element.trim();
      }
    }
    data = { ...data, rating };
    if (!review) {
      data['course'] = courseID;
      dispatch(addReview(data));
    } else {
      dispatch(editReview(review._id, data));
    }
  };

  React.useEffect(() => {
    if (review) {
      change('review', review.review);
      setRating(review.rating);
    }
  }, []);

  return (
    <Box px={4} py={2}>
      <Box fontSize={22} textAlign="center">
        Bạn đánh giá khóa học này như thế nào?
      </Box>
      <Alert />
      <Box my={2} textAlign="center">
        <Rating
          name="rating"
          value={rating}
          size="large"
          emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
          onChange={changeRating}
        />
      </Box>
      <form onSubmit={handleSubmit(submitForm)} className={classes.formComent}>
        <Field
          name="review"
          component={renderTextField}
          label="Nội dung"
          placeholder="Hãy nói gì về khóa học này"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
        />
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            className={classes.button}
            type="submit"
            disabled={invalid || submitting}
          >
            Đánh giá
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default compose(
  withStyles(styles),
  reduxForm({ form: 'formRating', validate })
)(FormRating);
