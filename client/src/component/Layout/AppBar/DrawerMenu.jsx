import {
  Divider,
  Drawer,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  withStyles,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/actions/CategoryAction';
import styles from './styles';
import { Link } from 'react-router-dom';
import DialogCustom from '../DialogCustom';
import Login from '../Login';
import SignUp from '../SignUp';
import { logOut } from '../../../redux/actions/AuthAction';

const DrawerMenu = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const [expanded, setExpanded] = React.useState(false);
  const authentication = useSelector((state) => state.auth.authentication);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  const signOut = () => {
    dispatch(logOut());
  };

  return (
    <Drawer
      className={classes.drawer}
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={props.handleDrawerMenu}
    >
      <div>
        <IconButton onClick={props.handleDrawerMenu}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <List>
        {!authentication ? (
          <>
            <ListItem button>
              <DialogCustom
                title="Login"
                button={<ListItemText primary="Đăng nhập" />}
                content={<Login />}
              />
            </ListItem>
            <ListItem button>
              <DialogCustom
                title="Sign Up"
                button={<ListItemText primary="Đăng ký" />}
                content={<SignUp />}
              />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={signOut}>
            <ListItemText primary="Đăng Xuất" />
          </ListItem>
        )}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Danh mục
          </ListSubheader>
        }
      >
        {categories.length > 0 &&
          categories.map((item, i) => (
            <ExpansionPanel
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
              style={{ boxShadow: 'none', position: 'unset', margin: 0 }}
              key={i}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ padding: '0 16px' }}>
                <ListItem
                  button
                  component={Link}
                  to={`/category/${item.slug}.${item._id}`}
                  onClick={props.handleDrawerMenu}
                >
                  <ListItemText primary={`All ${item.title}`} />
                </ListItem>
              </ExpansionPanelDetails>
              {item.topics.map((item, i) => (
                <ExpansionPanelDetails key={i} style={{ padding: '0 16px' }}>
                  <ListItem
                    button
                    component={Link}
                    to={`/topic/${item.slug}.${item._id}`}
                    onClick={props.handleDrawerMenu}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                </ExpansionPanelDetails>
              ))}
            </ExpansionPanel>
          ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/my-courses"
          onClick={props.handleDrawerMenu}
        >
          <ListItemText primary="Yêu thích" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/cart"
          onClick={props.handleDrawerMenu}
        >
          <ListItemText primary="Giỏ hàng" />
        </ListItem>
        {authentication && (
          <ListItem
            button
            component={Link}
            to="/my-courses"
            onClick={props.handleDrawerMenu}
          >
            <ListItemText primary="Vào học" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};
export default withStyles(styles)(DrawerMenu);
