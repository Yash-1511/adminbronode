import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Container,
  Grid,
  withStyles,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import Select from 'react-select';
import style from './style';
import { Link } from 'react-router-dom';
import { dynamicSort } from '../../../../commons/DynamicSort';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const optionsRating = [
  { value: '-createdAt', label: 'Mới thêm' },
  { value: 'course.name', label: 'Tiêu đề: A-Z' },
  { value: '-course.name', label: 'Tiêu đề: Z-A' },
];

const pagiantion = (array, limit = 12) => {
  // const limit = 2;
  // const skip = (page - 1) * limit;

  return array.skip(0).limit(limit);
};

const DetailCourse = (props) => {
  const { classes, coursesBuy, isMyCourse } = props;
  const [filter, setFilter] = React.useState({});
  const [limit, setLimit] = React.useState(2);
  const [courses, setCourses] = React.useState(coursesBuy);
  const [courseFilter, setCourseFilter] = React.useState([]);
  const location = useLocation();
  const history = useHistory();
  const cate = useSelector((state) => state.category.category);

  const handleChange = (newValue, { name }) => {
    setCourses(coursesBuy);
    const value = newValue ? newValue.value : null;

    if (value) {
      setFilter({ ...filter, [name]: value });
    } else {
      let newFilter = { ...filter };
      delete newFilter[name];
      setFilter(newFilter);
    }
  };

  React.useMemo(() => {
    const query = Object.keys(filter)
      .map((key) => key + '=' + filter[key])
      .join('&');
    history.push(`${location.pathname}?${query}`);
    let newCourses = [...coursesBuy];

    if (filter['sort']) {
      courses.sort(dynamicSort(filter['sort']));
    }
    if (filter['category']) {
      newCourses = newCourses.filter(
        (item) => item.course.category === filter['category']
      );
    }
    if (filter['instructor']) {
      newCourses = newCourses.filter(
        (item) => item.course.createBy._id === filter['instructor']
      );
    }

    setLimit(12);
    setCourses(pagiantion(newCourses));
    if (Object.keys(filter).length !== 0) {
      setCourseFilter(newCourses);
    }
  }, [filter]);

  const optionsCategory = () => {
    let categories = coursesBuy.reduce((categories, item) => {
      const { title, _id } = cate.find(
        (value) => value.id === item.course.category
      );

      categories.push({ label: title, value: _id });
      return categories;
    }, []);

    categories = categories.filter(
      (v, i, a) => a.findIndex((t) => t.value === v.value) === i
    );
    return categories;
  };

  const optionsInstructor = () => {
    let instructors = coursesBuy.reduce((instructors, item) => {
      const { fristName, lastName, _id } = item.course.createBy;
      instructors.push({ value: _id, label: `${fristName} ${lastName}` });

      return instructors;
    }, []);

    instructors = instructors.filter(
      (v, i, a) => a.findIndex((t) => t.value === v.value) === i
    );
    return instructors;
  };

  const loadCourses = () => {
    if (Object.keys(filter).length === 0) {
      setCourses(pagiantion([...coursesBuy], limit + 12));
    } else {
      setCourses(pagiantion([...courseFilter], limit + 12));
    }
    setLimit(limit + 12);
  };

  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item sm={3} xs={4}>
            <Box fontSize={12} mb={0.5} color="#686f7a">
              Sắp xếp{' '}
            </Box>
            <Select
              name="sort"
              defaultValue={optionsRating[0]}
              onChange={handleChange}
              options={optionsRating}
            />
          </Grid>
          <Grid item sm={3} xs={4}>
            <Box fontSize={12} mb={0.5} color="#686f7a">
              Lọc
            </Box>
            <Select
              isClearable
              name="category"
              onChange={handleChange}
              options={cate.length > 0 && optionsCategory()}
              placeholder="Danh mục"
            />
          </Grid>
          {!isMyCourse && (
            <Grid item sm={3} xs={4}>
              <Select
                isClearable
                name="instructor"
                onChange={handleChange}
                options={optionsInstructor()}
                placeholder="Tác giả"
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2}>
          {courses.length > 0
            ? courses.map(({ course }, i) => (
                <Grid
                  item
                  md={3}
                  sm={6}
                  xs={12}
                  key={i}
                  component={Link}
                  to={`/course/${course.slug}.${course._id}/learn`}
                  className={classes.card}
                >
                  <Card variant="outlined">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="135"
                        image={course.thumnail}
                      />
                      <Box py={1.2} fontSize={13} fontWeight="bold" px={2}>
                        {course.name}
                        <Box fontWeight="fontWeightRegular">{`${course.createBy.fristName} ${course.createBy.lastName}`}</Box>
                      </Box>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Vào học
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={loadCourses}
            disabled={
              courses.length === coursesBuy.length ||
              courses.length === courseFilter.length
            }
          >
            Tải thêm
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default withStyles(style)(DetailCourse);
