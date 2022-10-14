import { withStyles, Container, Typography, Box } from '@material-ui/core';
import React from 'react';
import style from './style';
import Tab from '../Tab/Tab.jsx';
import {
  fetchCoursePopular,
  fetchCourseNew,
  resetCourseStart,
  fetchCourseFeature
} from '../../../redux/actions/CourseAction';
import { useDispatch, useSelector } from 'react-redux';

const index = props => {
  const { classes, topic } = props;
  const course = useSelector(state => state.course.courseStart);
  const dispatch = useDispatch();

  const fetchData = topicID => {
    dispatch(fetchCoursePopular(topicID, true));
    dispatch(fetchCourseNew(topicID, true));
  };

  React.useEffect(() => {
    if (course.length === 0) {
      fetchData(topic._id);
    } else {
      dispatch(resetCourseStart());
      fetchData(topic._id);
    }
  }, [topic]);

  return (
    <section>
      <Container fixed>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
          Các khóa học để bắt đầu
        </Typography>
        {course.length === 2 ? (
          <Box mt={4}>
            <Tab course={course} />
          </Box>
        ) : null}
      </Container>
    </section>
  );
};

export default withStyles(style)(index);
