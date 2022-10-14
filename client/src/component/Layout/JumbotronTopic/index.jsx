import React from 'react';
import { Typography, Box, Container, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import style from './style';
import PeopleIcon from '@material-ui/icons/People';

const index = props => {
  const { classes, topic, category } = props;
  return (
    <section>
      <Box mt={6} mb={6}>
        <Container fixed>
          <Typography gutterBottom variant="h4" style={{ fontWeight: 'bold' }}>
            Các khóa học {topic.title}
          </Typography>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            {topic.title} trong các{' '}
            {category.map((item, i) => (
              <Typography
                display="inline"
                variant="body1"
                color="primary"
                component={Link}
                to={`/category/${item.slug}.${item._id}`}
                key={i}
                className={classes.categoryLink}
              >
                {category.length - 1 === i ? item.title : `${item.title}, `}
              </Typography>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" className={classes.textIcon}>
            <PeopleIcon style={{ marginRight: '.5rem' }} /> 1 triệu người đang
            học Javacript tại Educati
          </Typography>
        </Container>
      </Box>
    </section>
  );
};

export default withStyles(style)(index);
