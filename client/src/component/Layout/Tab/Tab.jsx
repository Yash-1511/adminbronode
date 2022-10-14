import React from 'react';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import TabPanel from '../TabPanel/TabPanel.jsx';
import style from './styles.js';
import {
  tabPanelCategory,
  copyCourseList,
} from '../../../redux/actions/TabActions';
import Carousel from '../Carousel/Carousel.jsx';
import { useDispatch } from 'react-redux';

const TabCourse = (props) => {
  const { classes, course } = props;
  const classesTabs = {
    root: classes.tabRoot,
    selected: classes.tabSelected,
  };
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(tabPanelCategory(newValue));
  };

  React.useEffect(() => {
    dispatch(copyCourseList(course));
  }, [course]);

  return (
    <React.Fragment>
      <Tabs
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabsIndicator,
        }}
        value={value}
        onChange={handleChange}
      >
        {course &&
          course.map((item, i) => (
            <Tab
              key={i}
              disableRipple
              classes={classesTabs}
              label={item.title}
            />
          ))}
      </Tabs>
      {course &&
        course.map((item, i) => (
          <TabPanel key={i} value={value} index={i}>
            <Carousel />
          </TabPanel>
        ))}
    </React.Fragment>
  );
};

export default withStyles(style)(TabCourse);
