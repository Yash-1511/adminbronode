import {
  Box,
  Button,
  Container,
  Icon,
  isWidthUp,
  withStyles,
  withWidth,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { compose } from 'redux';
import { Scroll } from '../../../../commons/Scroll';
import { fetchQuestionCourse } from '../../../../redux/actions/QuestionAction';
import AddQuestion from './AddQuestion';
import QuestionItem from './QuestionItem';
import ReplyQuestion from './ReplyQuestion';
import style from './style';

const optionsRating = [{ value: 'me', label: 'Tôi đã hỏi' }];

const optionsLecture = [{ value: 'current', label: 'Bài học hiện tại' }];

const index = (props) => {
  const { classes, courseId, width, currentIndex } = props;
  const [isAddComment, setIsAddComment] = React.useState(false);
  const [isReply, setIsReply] = React.useState(false);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);
  const userId = useSelector((state) => state.auth.user._id);
  const disableLoadMore = useSelector(
    (state) => state.question.disableLoadMore
  );
  const [query, setQuery] = React.useState({ page: 1 });
  const [questionId, setQuestionId] = React.useState(null);

  const handleAdd = (question) => {
    setQuestionId(question ? question._id : question);
    setIsAddComment(!isAddComment);
  };

  const handleReply = (question) => {
    setIsReply(!isReply);
    setQuestionId(question ? question._id : question);
  };

  React.useEffect(() => {
    dispatch(fetchQuestionCourse(courseId, query));
  }, [query]);

  const nextPage = (button) => {
    Scroll('#scroll');
    setQuery({
      ...query,
      page: button === 'next' ? query['page'] + 1 : query['page'] - 1,
    });
  };

  const handleChange = (newValue, { name }) => {
    if (newValue) {
      setQuery({
        ...query,
        [name]:
          newValue.value === 'me'
            ? userId
            : `Chuong ${currentIndex[0] + 1} Bai ${currentIndex[1] + 1}`,
      });
    } else {
      let newQuery = { ...query };
      delete newQuery[name];
      newQuery['page'] = 1;
      setQuery(newQuery);
    }
  };

  return (
    <Container>
      {isAddComment ? (
        <AddQuestion
          handleAdd={handleAdd}
          currentIndex={currentIndex}
          courseId={courseId}
          userId={userId}
          question={questionId && questions[questionId]}
        />
      ) : isReply ? (
        <ReplyQuestion
          handleReply={handleReply}
          question={questions[questionId]}
          userId={userId}
        />
      ) : (
        <Box mb={4} id="scroll">
          <Box
            width={isWidthUp('sm', width) ? '25%' : '45%'}
            mb={2}
            mr={1}
            display="inline-block"
          >
            <Select
              isClearable
              name="user"
              onChange={handleChange}
              options={optionsRating}
              placeholder="Lọc theo câu hỏi"
            />
          </Box>
          <Box
            width={isWidthUp('sm', width) ? '25%' : '45%'}
            mb={2}
            mr={1}
            display="inline-block"
          >
            <Select
              isClearable
              name="lecture"
              onChange={handleChange}
              options={optionsLecture}
              placeholder="Lọc theo bài học"
            />
          </Box>
          <Box
            borderColor="#dedfe0"
            mb={1}
            borderBottom={1}
            pb={2}
            display="flex"
          >
            <Box
              fontWeight="bold"
              style={{ cursor: 'pointer' }}
              onClick={handleAdd}
            >
              Thêm câu hỏi
            </Box>
          </Box>
          {questions
            ? Object.values(questions).length > 0
              ? Object.values(questions).map((item) => (
                  <QuestionItem
                    isWidthUp={isWidthUp}
                    width={width}
                    key={item._id}
                    item={item}
                    handleReply={handleReply}
                    userId={userId}
                    handleAdd={handleAdd}
                  />
                ))
              : 'Không có câu hỏi nào'
            : 'loading'}
          <Box mt={4} spacing={2} className={classes.pagination}>
            <Button
              onClick={() => nextPage('prev')}
              disabled={query['page'] === 1 ? true : false}
              startIcon={<Icon fontSize="small">keyboard_arrow_left</Icon>}
              disableRipple
            >
              Prev
            </Button>
            <Box className={classes.numberPage}>{query['page']}</Box>
            <Button
              onClick={() => nextPage('next')}
              endIcon={<Icon fontSize="small">keyboard_arrow_right</Icon>}
              disableRipple
              disabled={disableLoadMore}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default compose(withStyles(style), withWidth())(index);
