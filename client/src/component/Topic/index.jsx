import { Toolbar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import JumbotronTopic from '../Layout/JumbotronTopic';
import TopicCourseStart from '../Layout/TopicCourseStart';
import AllCourseInCate from '../Layout/AllCourseInCate/AllCourseInCate';

const Topic = () => {
  let topicID = useParams()['id'].split('.')[1];
  const getCate = useSelector(state => state.category.category);
  const [category, setCategory] = React.useState([]);
  const [topic, setTopic] = React.useState(null);

  React.useEffect(() => {
    if (getCate.length > 0) {
      let newCategory = [...getCate];
      newCategory = newCategory.filter(item =>
        item.topics.find(item => item._id === topicID)
      );
      setCategory(newCategory);
      setTopic(
        newCategory[0]
          ? newCategory[0]['topics'].find(item => item._id === topicID)
          : null
      );
    }
  }, [getCate, topicID]);

  return category.length > 0 && topic ? (
    <>
      <Toolbar />
      <JumbotronTopic topic={topic} category={category} />
      <TopicCourseStart topic={topic} />
      <AllCourseInCate isTopic={true} type={topic} />
    </>
  ) : (
    'loading'
  );
};

export default Topic;
