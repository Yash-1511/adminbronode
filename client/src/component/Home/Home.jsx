import React from 'react';
import Banner from '../Layout/Banner/Banner.jsx';
import Category from '../Layout/Category/Category.jsx';
import Instructor from '../Layout/Instructor/Instructor.jsx';
import TopCourse from '../Layout/TopCourse/TopCourse.jsx';

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Category />
      <TopCourse />
      <Instructor />
    </React.Fragment>
  );
};

export default Home;
