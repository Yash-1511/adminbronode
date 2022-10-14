import { Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import CardCourse from '../CardCourse/CardCourse.jsx';
import './styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Carousels = (props) => {
  const { tabPanel, category } = useSelector((state) => ({
    tabPanel: state.tab.tabPanel,
    category: state.tab.courseList,
  }));

  return category && category.length > 0 ? (
    category[tabPanel]['courses'].length > 0 ? (
      <Carousel
        containerClass="container-with-dots"
        minimumTouchDrag={80}
        responsive={responsive}
      >
        {category &&
          category[tabPanel]['courses'].map((item, i) => (
            <CardCourse key={i} course={item} />
          ))}
      </Carousel>
    ) : (
      <Typography variant="h6" align="center">
        Danh mục này chưa có khóa học nào!!!
      </Typography>
    )
  ) : null;
};

export default Carousels;
