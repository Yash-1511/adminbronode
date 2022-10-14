import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  isWidthDown,
  isWidthUp,
  Popover,
  Toolbar,
  withWidth,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import logo from '../../../../public/img/logo-white1.png';
import DialogCustom from '../DialogCustom';
import styles from './styles';
import FormRating from './FormRating';

const RenderRating = (props) => (
  <DialogCustom
    title={props.title}
    button={
      <Button
        color="inherit"
        className={props.button}
        startIcon={<StarBorderRoundedIcon />}
      >
        {props.titleButton}
      </Button>
    }
    content={<FormRating review={props.review} courseID={props.courseID} />}
  />
);

const index = (props) => {
  const { classes } = props;
  const { width } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [progressUI, setProgressUI] = React.useState(0);
  const course = useSelector((state) => state.course.courseDetails);
  const proccess = useSelector((state) => state.proccess.proccesses);
  const userID = useSelector((state) => state.auth.user._id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const completeLesson = proccess && Object.keys(proccess).length;
    const totalLesson = document.querySelectorAll('input[type=checkbox]')
      .length;

    setProgressUI(Math.round((completeLesson * 100) / totalLesson));
  }, [proccess]);

  return (
    <section className={classes.root}>
      <AppBar position="fixed" classes={{ colorPrimary: classes.colorAppBar }}>
        <Toolbar>
          {isWidthDown('xs', width) && (
            <Link to={`/my-courses`} className={classes.backMyCourse}>
              <ArrowBackRoundedIcon className={classes.menuButton} />
            </Link>
          )}
          <Box className={classes.title}>
            {isWidthUp('sm', width) && (
              <Link to="/">
                <img src={logo} className={classes.badge} />
              </Link>
            )}
            <Box
              borderLeft={isWidthDown('xs', width) ? 0 : 1}
              className={classes.nameCourse}
              component={Link}
              to={`/course/${course.slug}.${course._id}`}
            >
              {course.name}
            </Box>
          </Box>
          {isWidthUp('md', width) &&
            (Object.keys(course).length > 0 &&
            userID &&
            course['reviews'].some((item) => item.user === userID) ? (
              <RenderRating
                button={classes.button}
                title="Sửa đánh giá khóa học"
                titleButton="Sửa đánh giá"
                review={course['reviews'].find((item) => item.user === userID)}
              />
            ) : (
              <RenderRating
                button={classes.button}
                title="Đánh giá khóa học"
                titleButton="Đánh giá"
                courseID={course._id}
              />
            ))}
          {isWidthUp('sm', width) && (
            <Button
              color="inherit"
              className={classes.button}
              onClick={handleClick}
              startIcon={
                <CircularProgress
                  variant="static"
                  value={progressUI}
                  size={30}
                  color="primary"
                />
              }
            >
              Tiến độ
            </Button>
          )}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box className={classes.process}>
              {proccess && Object.keys(proccess).length}/
              {document.querySelectorAll('input[type=checkbox]').length} đã hoàn
              thành
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
    </section>
  );
};
export default compose(withStyles(styles), withWidth())(index);
