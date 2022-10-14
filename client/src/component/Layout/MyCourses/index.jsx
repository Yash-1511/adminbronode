import { Box, Container, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import TabPanel from '../TabPanel/TabPanel';
import CourseBuy from './CourseBuy';
import style from './style';

const DetailCourse = (props) => {
  const { classes } = props;
  const [value, setValue] = React.useState(0);
  const classesTabs = {
    root: classes.tabRoot,
    selected: classes.tabSelected,
  };
  const user = useSelector((state) => state.auth.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
      <Container>
        <Tabs
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator,
          }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab disableRipple classes={classesTabs} label="Đã mua" />
          <Tab disableRipple classes={classesTabs} label="Đã đăng" />
          <Tab disableRipple classes={classesTabs} label="Đã thích" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {Object.keys(user).length > 0 && user.coursesBuy.length > 0 ? (
            <CourseBuy coursesBuy={user.coursesBuy} isMyCourse={false} />
          ) : (
            <Box fontSize={36} mb={4} textAlign="center">
              Bạn chưa có khóa học nào
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {Object.keys(user).length > 0 && user.myCourses.length > 0 ? (
            <CourseBuy coursesBuy={user.myCourses} isMyCourse={true} />
          ) : (
            <Box fontSize={36} mb={4} textAlign="center">
              Bạn chưa có khóa học nào
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {Object.keys(user).length > 0 ? (
            <CourseBuy coursesBuy={user.favoriteCourse} />
          ) : (
            <Box fontSize={36} mb={4} textAlign="center">
              Bạn chưa có khóa học nào
            </Box>
          )}
        </TabPanel>
      </Container>
    </section>
  );
};

export default withStyles(style)(DetailCourse);
