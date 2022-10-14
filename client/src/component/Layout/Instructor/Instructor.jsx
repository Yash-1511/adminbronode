import React from 'react';
import {
  withStyles,
  Container,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import styles from './styles';
import TitleSection from '../TitleSection/TitleSection.jsx';

const Instructor = props => {
  const { classes } = props;
  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container direction="row" justify="center" alignItems="center">
          <TitleSection title="Trở thành giảng viên" />
          <Grid item md={6} className={classes.center}>
            <Typography align="center" variant="h6">
              Chia sẻ kiến ​​thức của bạn và tiếp cận hàng triệu sinh viên trên
              toàn cầu. Tham gia thị trường học tập trực tuyến lớn nhất thế
              giới.
            </Typography>
            <Button
              className={classes.button}
              size="large"
              variant="contained"
              color="primary"
              disableElevation
            >
              Bắt đầu
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(Instructor);
