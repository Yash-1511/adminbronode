import { Toolbar } from '@material-ui/core';
import React from 'react';
import Jumbotron from '../Layout/Jumbotron/Jumbotron.jsx';
import TopicInCategory from '../Layout/TopicInCategory/TopicInCategory.jsx';
import CourseStart from '../Layout/CourseStart/CourseStart.jsx';
import { useParams } from 'react-router-dom';
import AllCourseInCate from '../Layout/AllCourseInCate/AllCourseInCate.jsx';
import { useSelector } from 'react-redux';

const Category = () => {
  let categoryParams = useParams()['id'].split('.')[1];
  let { category } = useSelector(state => state.category);
  category = category.find(item => item._id === categoryParams);

  return category ? (
    <>
      <Toolbar />
      <TopicInCategory category={category} />
      <Jumbotron category={category['title']} />
      <CourseStart categoryID={category['_id']} />
      <AllCourseInCate type={category} isTopic={false} />
    </>
  ) : null;
};

export default Category;
