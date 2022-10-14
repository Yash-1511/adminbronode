import React from 'react';
import Jumbotron from '../Layout/Jumbotron/Jumbotron';
import { Toolbar } from '@material-ui/core';
import MyCourses from '../Layout/MyCourses';

const index = () => {
  return (
    <section>
      <Toolbar />
      <Jumbotron category="Khóa học của tui" />
      <MyCourses />
    </section>
  );
};

export default index;
