import {
  Avatar,
  Box,
  Button,
  TextField,
  withStyles,
  withWidth,
  Container,
} from '@material-ui/core';
import React from 'react';
import { compose } from 'redux';
import style from './style';
import validate from './validate';
import { TimeAgo } from '../../../../commons/TimeAgo';
import renderTextField from '../../../../commons/FormHelper/renderTextField';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import {
  addReplyQuestion,
  updateReplyQuestion,
  deleteReplyQuestion,
} from '../../../../redux/actions/QuestionAction';
import DotMenu from '../DotMenu';

const index = (props) => {
  const {
    classes,
    width,
    handleReply,
    question,
    userId,
    handleSubmit,
    invalid,
    submitting,
    change,
    reset,
  } = props;
  const dispatch = useDispatch();
  const [replyQuestionId, setReplyQuestionId] = React.useState(null);

  const backAllQuestion = () => {
    handleReply(null);
  };

  const submitForm = (data) => {
    data['content'] = data.content.trim();

    if (replyQuestionId) {
      dispatch(updateReplyQuestion(question._id, replyQuestionId, data));
      setReplyQuestionId(null);
    } else {
      data['user'] = userId;
      dispatch(addReplyQuestion(question._id, data));
    }
    reset();
  };

  const handleEdit = (replyQuestion) => {
    change('content', replyQuestion.content);
    setReplyQuestionId(replyQuestion._id);
  };

  const handleDelete = (replyQuestion) => {
    const isDelete = confirm(
      `Bạn muốn xóa câu trả lời có tiêu đề là ${replyQuestion.content}`
    );
    if (isDelete) {
      dispatch(deleteReplyQuestion(question._id, replyQuestion._id));
    }
  };

  return (
    <Container>
      <Box mb={4}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={backAllQuestion}
          size="large"
        >
          Trở về
        </Button>
        <Box display="flex" mt={2} py={2} px={3}>
          <Box mr={2}>
            <Avatar src={question.user.photo} />
          </Box>
          <Box flexGrow={1} fontSize={14}>
            <Box fontWeight="bold">{question.title}</Box>
            <Box mt={1}>
              <Box display="inline" mr={1} color="primary.main">
                {userId === question.user._id
                  ? 'tôi'
                  : `${question.user.fristName} ${question.user.lastName}`}
              </Box>
              <Box
                display="inline"
                mr={1}
                color="primary.main"
                style={{ cursor: 'pointer' }}
              >
                {question.lecture}
              </Box>
              <Box display="inline">{TimeAgo(question.createdAt)}</Box>
            </Box>
            <Box mt={1}>{question.content}</Box>
          </Box>
        </Box>
        <Box borderColor="#dedfe0" mb={1} borderBottom={1} pb={2}>
          Trả lời
        </Box>
        {question.reply.length > 0
          ? question.reply.map((item) => (
              <Box display="flex" mt={2} py={2} px={3} key={item._id}>
                <Box mr={2}>
                  <Avatar src={item.user.photo} />
                </Box>
                <Box flexGrow={1} fontSize={14}>
                  <Box fontWeight="bold">
                    {userId === item.user._id
                      ? 'tôi'
                      : `${item.user.fristName} ${item.user.lastName}`}
                  </Box>
                  <Box mt={1}>
                    <Box display="inline">{TimeAgo(item.createdAt)}</Box>
                  </Box>
                  <Box mt={1}>{item.content}</Box>
                </Box>
                {item.user._id === userId && (
                  <DotMenu
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() => handleDelete(item)}
                  />
                )}
              </Box>
            ))
          : 'Chưa có câu trả lời nào'}
        <form onSubmit={handleSubmit(submitForm)}>
          <Box mt={2} className={classes.formComent}>
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
  reduxForm({ form: 'formReplyQuestion', validate })
)(index);
