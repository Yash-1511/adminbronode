import {
  Avatar,
  Box,
  Collapse,
  FormControlLabel,
  Grid,
  withStyles,
  Container,
} from '@material-ui/core';
import React from 'react';
import { formatDuration } from '../../../../commons/FormatDuration';
import style from './style';
import { Link } from 'react-router-dom';

const InfoCourse = (props) => {
  const { classes, course } = props;
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Container>
      <Box mx={3} borderBottom={1} px={3} borderColor="#dedfe0">
        <Box fontSize={24} mb={2} fontWeight="bold">
          Thông tin khóa học
        </Box>
        <Box
          fontSize={15}
          mb={4}
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </Box>
      <Box mx={3} borderBottom={1} p={3} borderColor="#dedfe0">
        <Box>Học viên: {course.studentQuantity}</Box>
        <Box>Bài giảng: 10</Box>
        <Box>
          Thời lượng:
          {course.duration ? formatDuration(course.duration) : null}
        </Box>
      </Box>
      <Collapse in={checked}>
        <Box borderColor="#e8e9eb" mx={3} borderBottom={1} p={3}>
          <Grid container>
            <Grid item xs>
              Mô tả
            </Grid>
            <Grid
              item
              xs
              dangerouslySetInnerHTML={{ __html: course.detailDescription }}
            />
          </Grid>
        </Box>
        <Box borderColor="#e8e9eb" mx={3} borderBottom={1} p={3}>
          <Grid container>
            <Grid item xs>
              Tác giả
            </Grid>
            <Grid item xs>
              <Box display="flex">
                <Avatar src={course.author[0].photo} className={classes.large}>
                  {`${course.author[0].fristName.charAt(
                    0
                  )}${course.author[0].lastName.charAt(0)}`}
                </Avatar>
                <Box
                  className={classes.linkUser}
                  ml={3}
                  fontSize={19}
                  fontWeight="bold"
                  color="primary.main"
                  component={Link}
                  to={`/user/${course.author[0]._id}`}
                >
                  {`${course.author[0].fristName} ${course.author[0].lastName}`}
                </Box>
              </Box>
              <Box mt={2}>mo ta</Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
      <Box mx={3} p={3}>
        <FormControlLabel
          onClick={handleClick}
          control={<Box />}
          label={!checked ? 'Xem thêm' : 'Ẩn'}
        />
      </Box>
    </Container>
  );
};

export default withStyles(style)(InfoCourse);
