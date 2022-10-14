import { Box, Button, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import Select from 'react-select';
import CardCourseSingle from '../CardCourseSingle/CardCourseSingle';
import { search } from '../SearchMenu/search';
import styles from './styles';
import useQuery from './useQuery';

const optionsRating = [
  { value: '-ratingAverage', label: 'Đánh giá cao' },
  { value: '-createdAt', label: 'Mới' },
  { value: '-price', label: 'Giá cao' },
  { value: 'price', label: 'Giá thấp' },
];

const SearchMenu = (props) => {
  const { classes } = props;
  const [page, setPage] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [select, setSelect] = React.useState({ page: 1 });
  const [disableButton, setdisableButton] = React.useState(false);
  const query = useQuery();

  const getCourses = async (searchKey) => {
    const newCourse = await search(searchKey, true, true, select);
    newCourse.length === 0 && setdisableButton(true);
    setCourses(page ? courses.concat(newCourse) : newCourse);
  };

  React.useMemo(() => {
    getCourses(query.get('q'));
  }, [select, query.get('q')]);

  const setPageHandle = () => {
    setPage(true);
    setSelect({ ...select, page: select.page + 1 });
  };

  const handleChangeFilter = (newValue, { name }) => {
    const value = newValue ? newValue.value : null;

    setCourses([]);
    setdisableButton(false);
    if (value) {
      setSelect({ ...select, [name]: value, page: 1 });
    } else {
      let newFilter = { ...select };
      delete newFilter[name];
      newFilter['page'] = 1;
      setSelect(newFilter);
    }
  };

  return (
    <Box mx={3} my={6}>
      <Box width="20vw" mr={1} display="inline-block">
        <Select
          name="sort"
          isClearable
          onChange={handleChangeFilter}
          options={optionsRating}
          placeholder="Sắp xếp"
        />
      </Box>
      <Grid container>
        <Grid item sm={12} md={8}>
          {courses.map((item, i) => (
            <CardCourseSingle key={i} course={item} />
          ))}
          <Box textAlign="center">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={setPageHandle}
              disabled={disableButton}
            >
              Xem thêm
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(SearchMenu);
