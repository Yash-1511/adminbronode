import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  isWidthDown,
  isWidthUp,
  Tab,
  Tabs,
  withStyles,
  withWidth,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React from 'react';
import { compose } from 'redux';
import TabPanel from '../TabPanel/TabPanel';
import ExpandContent from './ExpandContent';
import InfoCourse from './InfoCourse';
import Question from './Question';
import style from './style';
import Video from './Video';

const DetailCourse = (props) => {
  const { classes, width, course } = props;
  const [closeContent, setCloseContent] = React.useState(false);
  const [linkVideo, setLinkVideo] = React.useState('');
  const [value, setValue] = React.useState(1);
  const [currentIndex, setCurrentIndex] = React.useState([0, 0]);
  const classesTabs = {
    root: classes.tabRoot,
    selected: classes.tabSelected,
  };

  const handleCloseContent = () => {
    setCloseContent(!closeContent);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeVideo = (index) => {
    const [i, j] = index;
    setLinkVideo(course.section[i].content[j].link);
    setCurrentIndex([i, j]);
  };

  React.useEffect(() => {
    setLinkVideo(course.section[0].content[0].link);
  }, [course]);

  React.useMemo(() => {
    if (isWidthUp('md', width) && value === 0) {
      setValue(1);
    }
  }, [width]);
  return (
    <section>
      <Grid container>
        <Grid item md={closeContent ? 12 : 8} sm={12} xs={12}>
          <Box>
            <Video
              url={linkVideo}
              videoID={
                course.section[currentIndex[0]].content[currentIndex[1]]._id
              }
            />
            {closeContent && (
              <Button
                className={classes.buttonContent}
                onClick={handleCloseContent}
                color="primary"
                variant="outlined"
              >
                Nội dung
              </Button>
            )}
          </Box>
          <Container>
            <Tabs
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabsIndicator,
              }}
              value={value}
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
            >
              {(closeContent || isWidthDown('sm', width)) && (
                <Tab
                  disableRipple
                  classes={classesTabs}
                  value={0}
                  label="Nội dung"
                />
              )}
              <Tab
                disableRipple
                classes={classesTabs}
                value={1}
                label="Giới thiệu"
              />
              <Tab
                disableRipple
                classes={classesTabs}
                value={2}
                label="Hỏi đáp"
              />
            </Tabs>
          </Container>
          <TabPanel value={value} index={0}>
            <Container maxWidth="md" style={{ marginBottom: '2rem' }}>
              <ExpandContent
                courseContent={course.section}
                changeVideo={handleChangeVideo}
              />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InfoCourse course={course} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Question courseId={course._id} currentIndex={currentIndex} />
          </TabPanel>
        </Grid>
        {isWidthUp('md', width) && !closeContent && (
          <Grid item md={4} sm={12}>
            <Box
              fontSize={16}
              fontWeight="bold"
              border={1}
              borderColor="#dedfe0"
              px={2}
              display="flex"
            >
              <Box flexGrow={1} my="auto" mx={0}>
                Nội dung
              </Box>
              <IconButton
                className={classes.closeContent}
                onClick={handleCloseContent}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <ExpandContent
              courseContent={course.section}
              changeVideo={handleChangeVideo}
            />
          </Grid>
        )}
      </Grid>
    </section>
  );
};

export default compose(withStyles(style), withWidth())(DetailCourse);
