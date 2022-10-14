import { Avatar, Box, Grid, Typography, withStyles } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import React from 'react';
import style from './style';
import { Link } from 'react-router-dom';

const index = (props) => {
  const { classes, instructor } = props;

  return (
    <>
      <Grid container>
        <Grid item sm={4} xs={12} className={classes.boxAvatar}>
          <Avatar className={classes.large} src={instructor.photo} />
          <Box mt={2} className={classes.popularInstructor}>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <DoneOutlineIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              {instructor.avgRating} Ratings
            </Typography>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <DoneOutlineIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              {instructor.countReviews} Đánh giá
            </Typography>
            <Typography variant="subtitle2" className={classes.textWithIcon}>
              <DoneOutlineIcon
                style={{ marginRight: '.5rem' }}
                fontSize="small"
              />
              {instructor.countMyCourse} Khóa học
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box
            fontSize={18}
            mt={2}
            color="primary.main"
            fontWeight="fontWeightBold"
            component={Link}
            to={`/user/${instructor._id}`}
            style={{ textDecoration: 'none' }}
          >
            {instructor.fristName} {instructor.lastName}
          </Box>
          <Box dangerouslySetInnerHTML={{ __html: '<h1>Gioi thieu</h1>' }} />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(style)(index);
