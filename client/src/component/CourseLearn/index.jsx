import { Toolbar } from '@material-ui/core';
import React from 'react';
import CourseLearn from '../Layout/CourseLearn/index.jsx';
import useGetCourse from './useGetCourse';

const CourseLearnPage = () => {
  const [checkCourseBuy, course] = useGetCourse();

  return (
    checkCourseBuy && (
      <>
        <Toolbar />
        <CourseLearn course={course} />
      </>
    )
  );
};

export default CourseLearnPage;
