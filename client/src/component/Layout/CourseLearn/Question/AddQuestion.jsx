import {
  Box,
  Button,
  Container,
  TextField,
  withStyles,
  withWidth,
} from '@material-ui/core';
import React from 'react';
import { compose } from 'redux';
import style from './style';
import validate from './validate';
import { reduxForm, Field } from 'redux-form';
import {
  addQuestion,
  updateQuestion,
} from '../../../../redux/actions/QuestionAction';
import renderTextField from '../../../../commons/FormHelper/renderTextField';
import { useDispatch } from 'react-redux';

const index = (props) => {
  const {
    classes,
    width,
    handleAdd,
    handleSubmit,
    invalid,
    submitting,
    currentIndex,
    change,
    courseId,
    userId,
    question,
  } = props;
  const dispatch = useDispatch();

  const backAllQuestion = () => {
    handleAdd(null);
  };

  const submitForm = (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        data[key] = element.trim();
      }
    }

    data['lecture'] = `Chương ${currentIndex[0] + 1} Bài ${
      currentIndex[1] + 1
    }`;
    data['course'] = courseId;
    data['user'] = userId;

    if (!question) {
      dispatch(addQuestion(data));
    } else {
      dispatch(updateQuestion(question._id, data));
    }
    backAllQuestion();
  };

  React.useEffect(() => {
    if (question) {
      change('title', question.title);
      change('content', question.content);
    }
  }, []);

  return (
    <Container>
      <Box mb={4}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          size="large"
          onClick={backAllQuestion}
        >
          Trở về
        </Button>
        <form onSubmit={handleSubmit(submitForm)}>
          <Box mt={2} className={classes.formComent}>
            <Field
              name="title"
              component={renderTextField}
              fullWidth
              label="Tiêu đề"
              variant="outlined"
            />
            <Field
              name="content"
              component={renderTextField}
              fullWidth
              label="Nội dung"
              multiline
              rows={4}
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              type="submit"
              disabled={invalid || submitting}
            >
              Gửi
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default compose(
  withStyles(style),
  withWidth(),
  reduxForm({ form: 'formAddQuestion', validate })
)(index);
