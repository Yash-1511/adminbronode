import { Container, Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-multi-carousel';
import { useSelector, useDispatch } from 'react-redux';
import CardCourseSlide from '../CardCourseSlide/CardCourseSlide.jsx';
import Tab from '../Tab/Tab.jsx';
import style from './styles';
import {
  fetchCoursePopular,
  fetchCourseNew,
  resetCourseStart,
  fetchCourseFeature
} from '../../../redux/actions/CourseAction';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CourseStart = props => {
  const { classes, categoryID } = props;
  const { course, courseFeature } = useSelector(state => ({
    course: state.course.courseStart,
    courseFeature: state.course.courseFeature
  }));
  const dispatch = useDispatch();

  const fetchData = categoryID => {
    dispatch(fetchCoursePopular(categoryID, false));
    dispatch(fetchCourseNew(categoryID, false));
    dispatch(fetchCourseFeature(categoryID));
  };

  React.useEffect(() => {
    if (course.length === 0) {
      fetchData(categoryID);
    } else {
      dispatch(resetCourseStart());
      fetchData(categoryID);
    }
  }, [categoryID]);

  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Các khóa học để giúp bạn bắt đầu
          </Typography>
          <Grid item xs={12}>
            {course.length === 2 ? <Tab course={course} /> : null}
          </Grid>
          <Typography variant="h6" style={{ margin: '1rem 0' }}>
            Các khóa học nổi bật
          </Typography>
          <Grid item xs={12}>
            <Carousel
              infinite
              itemClass={classes.itemClass}
              minimumTouchDrag={80}
              responsive={responsive}
              sliderClass=""
              slidesToSlide={1}
              keyBoardControl={false}
            >
              {courseFeature &&
                courseFeature.map((item, i) => (
                  <CardCourseSlide key={i} course={item} />
                ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(style)(CourseStart);
