import React from 'react';
import { Toolbar } from '@material-ui/core';
import JumbotronDetailCourse from '../Layout/JumbotronDetailCourse';
import DetailCourse from '../Layout/DetailCourse';
import { useParams } from 'react-router-dom';
import { fetchDetailsCourse } from '../../redux/actions/CourseAction';
import { useDispatch } from 'react-redux';

const Course = () => {
  const courseParams = useParams()['id'].split('.')[1];
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDetailsCourse(courseParams));
  }, [courseParams]);

  return (
    <>
      <Toolbar />
      <JumbotronDetailCourse />
      <DetailCourse />
    </>
  );
};

export default Course;
