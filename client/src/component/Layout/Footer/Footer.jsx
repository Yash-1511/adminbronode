import React from 'react';
import {
  withStyles,
  Container,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  TextField
} from '@material-ui/core';
import logo from '../../../../public/img/logo-white1.png';
import styles from './styles';
import HeadsetIcon from '@material-ui/icons/Headset';
import MailIcon from '@material-ui/icons/Mail';
import RoomIcon from '@material-ui/icons/Room';

const Footer = props => {
  const { classes } = props;
  return (
    <section className={classes.root}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item lg={3} md={6} xs={12}>
            <img src={logo} />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="h5" className={classes.title}>
              Liên hệ
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              <HeadsetIcon fontSize="small" style={{ marginRight: '1rem' }} />
              800 567.890.576
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              <MailIcon fontSize="small" style={{ marginRight: '1rem' }} />
              support@educati.com
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              <RoomIcon fontSize="small" style={{ marginRight: '1rem' }} />
              184 Main Collins Street Chicago, United States
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="h5" className={classes.title}>
              Quick Links
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              About
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              Contact
            </Typography>
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography variant="h5" className={classes.title}>
              Bảng tin
            </Typography>
            <Typography variant="subtitle1" className={classes.content}>
              Đăng ký để nhận được thông báo!
            </Typography>
            <div style={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Nhập email"
                variant="outlined"
                size="small"
                InputProps={{
                  className: classes.input
                }}
              />
              <Button variant="contained" color="primary" disableElevation>
                Subcribe
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default withStyles(styles)(Footer);
