import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetailsCourse } from '../../redux/actions/CourseAction';
import { createProccess } from '../../redux/actions/ProccessAction';
import { loadUser } from '../../redux/actions/AuthAction';

const useGetCourse = () => {
  const courseParams = useParams()['id'].split('.')[1];
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.courseDetails);
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    dispatch(fetchDetailsCourse(courseParams));
    dispatch(loadUser());
  }, []);

  let checkCourseBuy = null;
  if (Object.keys(course).length > 0 && Object.keys(user).length > 0) {
    checkCourseBuy = user['coursesBuy'].some(({ course, proccess, _id }) => {
      if (course._id === courseParams) {
        dispatch(createProccess(proccess, _id));
        return course._id === courseParams;
      }
    });
  }

  return [checkCourseBuy, course];
};

export default useGetCourse;
