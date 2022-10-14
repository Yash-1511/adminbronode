import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import FormChangePassword from './FormChangePassword';
import FormEditInfo from './FormEditInfo';
import style from './style';
import { useSelector } from 'react-redux';

const menu = ['Thông tin', 'Tài khoản'];

const index = (props) => {
  const { classes } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const user = useSelector((state) => state.auth.user);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    Object.keys(user).length > 0 && (
      <>
        <Container className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Box p={1.2}>
                <Avatar src={user.photo} className={classes.avatar}>
                  {`${user.fristName.charAt(0)}${user.lastName.charAt(0)}`}
                </Avatar>
                <Box textAlign="center" mt={2} fontWeight="bold">
                  acb
                </Box>
              </Box>
              <List component="nav" aria-label="secondary mailbox folders">
                {menu.map((item, i) => (
                  <ListItem
                    button
                    key={item}
                    selected={selectedIndex === i}
                    onClick={(event) => handleListItemClick(event, i)}
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              {selectedIndex === 0 ? <FormEditInfo /> : <FormChangePassword />}
            </Grid>
          </Grid>
        </Container>
      </>
    )
  );
};

export default withStyles(style)(index);
