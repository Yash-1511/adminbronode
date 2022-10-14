import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { fetchAllCourse } from '../../../redux/actions/CourseAction';
import CardCourseSingle from '../CardCourseSingle/CardCourseSingle.jsx';
import style from './styles';
import { Scroll } from '../../../commons/Scroll';

const optionsRating = [
  { value: '4.5', label: 'Rating 4.5' },
  { value: '4.0', label: 'Rating 4.0' },
  { value: '3.5', label: 'Rating 3.5' },
  { value: '3.0', label: 'Rating 3.0' },
];

const optionsDuration = [
  { value: '10799', label: '0-2 hour' },
  { value: '10800-25199', label: '3-6 hour' },
  { value: '25200-61199', label: '7-16 hour' },
  { value: '61200', label: '17+ hour' },
];

const optionsSort = [
  // { value: '-studentQuantity', label: 'Phổ biến' },
  { value: '-ratingAverage', label: 'Rating cao' },
  { value: '-createdAt', label: 'Mới nhất' },
  { value: 'price', label: 'Giá thấp' },
  { value: '-price', label: 'Giá cao' },
];

const AllCourseInCate = (props) => {
  const { classes, type, isTopic } = props;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [select, setSelect] = React.useState({
    page: 1,
    sort: '-studentQuantity',
  });
  const allCourse = useSelector((state) => state.course.allCourse);
  let noFetchSelect = true;

  const handleChange = (newValue, { name }) => {
    if (newValue) {
      if (name === 'duration') {
        let selectCopy = { ...select };
        switch (newValue.value) {
          case '10799':
            delete selectCopy['duration[gte]'];
            selectCopy['duration[lte]'] = newValue.value;
            setSelect(selectCopy);
            break;
          case '61200':
            delete selectCopy['duration[lte]'];
            selectCopy['duration[gte]'] = newValue.value;
            setSelect(selectCopy);
            break;
          default:
            const [gte, lte] = newValue.value.split('-');
            setSelect({
              ...select,
              'duration[gte]': gte,
              'duration[lte]': lte,
            });
            break;
        }
      } else {
        setSelect({ ...select, [name]: newValue.value });
      }
    } else {
      const { [name]: _, ...newSelect } = select;
      if (name === 'duration') {
        delete newSelect['duration[gte]'];
        delete newSelect['duration[lte]'];
      } else if (name === 'sort') {
        newSelect['sort'] = '-studentQuantity';
      }
      setSelect(newSelect);
    }
  };

  React.useEffect(() => {
    dispatch(fetchAllCourse(type._id, select, isTopic));
    noFetchSelect = false;
  }, [type]);

  React.useEffect(() => {
    let query = '';
    for (const key in select) {
      if (select.hasOwnProperty(key)) {
        const element = select[key];
        if (
          (key !== 'page' || element !== 1) &&
          (key !== 'sort' || element !== '-studentQuantity')
        ) {
          query = query.concat(`&${key}=${element}`);
          query = query.replace(/^&+/, '');
        }
      }
    }
    history.push(`${location.pathname}?${query}`);
    if (noFetchSelect) {
      dispatch(fetchAllCourse(type._id, select, isTopic));
    }
  }, [select]);

  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container>
          <Typography variant="h5" className={classes.title} id="scroll">
            Tất cả khóa học {type.title}
          </Typography>
          <Box p={2} className={classes.sort}>
            <Grid item xs={4} md={2} style={{ marginRight: '1rem' }}>
              <Select
                name="ratingAverage[gte]"
                isClearable
                onChange={handleChange}
                options={optionsRating}
                placeholder="Rating"
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <Select
                isClearable
                name="duration"
                options={optionsDuration}
                onChange={handleChange}
                isSearchable={false}
                placeholder="Duration"
              />
            </Grid>
            <Grid item xs={4} md={2} style={{ marginLeft: '1rem' }}>
              <Select
                isClearable
                name="sort"
                onChange={handleChange}
                options={optionsSort}
                isSearchable={false}
                placeholder="Sort"
              />
            </Grid>
          </Box>
          {allCourse.length !== 0
            ? allCourse.map((item) => (
                <CardCourseSingle key={item._id} course={item} />
              ))
            : 'loading'}
          <Box mt={4} spacing={2} className={classes.pagination}>
            <Button
              onClick={() => {
                Scroll('#scroll');
                setSelect({ ...select, page: select['page'] - 1 });
              }}
              disabled={select['page'] === 1 ? true : false}
              startIcon={<Icon fontSize="small">keyboard_arrow_left</Icon>}
              disableRipple
              style={{ textTransform: 'none' }}
            >
              Prev
            </Button>
            <Box className={classes.numberPage}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                {select['page']}
              </Typography>
            </Box>
            <Button
              onClick={() => {
                Scroll('#scroll'); 
                setSelect({ ...select, page: select['page'] + 1 });
              }}
              endIcon={<Icon fontSize="small">keyboard_arrow_right</Icon>}
              disableRipple
              style={{ textTransform: 'none' }}
              disabled={allCourse.length === 0}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(style)(AllCourseInCate);
