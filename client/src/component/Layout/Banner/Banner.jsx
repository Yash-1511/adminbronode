import React from 'react';
import styles from './styles';
import {
  withStyles,
  Toolbar,
  Container,
  Typography,
  Grid,
} from '@material-ui/core';
import SearchMenu from '../SearchMenu/SearchMenu.jsx';

const Banner = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Toolbar />
      <section className={classes.banner}>
        <Grid container>
          <Grid item sm={12} md={4} className={classes.bannerContent}>
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              TÌM HIỂU KHÓA HỌC
            </Typography>
            <p>
              6.178 khóa học về Kinh doanh, Công nghệ và Kỹ năng Sáng tạo được
              giảng dạy bởi các chuyên gia trong ngành.
            </p>
            <SearchMenu content="Bạn muốn học cái gì?" />
          </Grid>
        </Grid>
      </section>
    </React.Fragment>
  );
};

export default withStyles(styles)(Banner);
