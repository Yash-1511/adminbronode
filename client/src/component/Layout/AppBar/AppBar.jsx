import {
  AppBar,
  Button,
  Grid,
  IconButton,
  isWidthDown,
  isWidthUp,
  Toolbar,
  withWidth,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import SignUp from '../../../component/Layout/SignUp';
import logo from '../../../../public/img/logo-black.png';
import AppBarAuth from '../AppBarAuth';
import CartMenu from '../CartMenu/CartMenu.jsx';
import DialogCustom from '../DialogCustom';
import Login from '../Login';
import NestedMenu from '../NestedMenu/NestedMenu.jsx';
import SearchMenu from '../SearchMenu/SearchMenu.jsx';
import DrawerMenu from './DrawerMenu';
import styles from './styles';

const index = (props) => {
  const { classes, width } = props;
  const { authentication, forgotPassword } = useSelector((state) => ({
    authentication: state.auth.authentication,
    forgotPassword: state.auth.forgotPassword,
  }));
  const [open, setOpen] = React.useState(false);

  const handleDrawerMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item style={{ display: 'flex' }} xs={12} sm={10} md={8}>
              {isWidthDown('sm', width) && (
                <>
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerMenu}
                    className={open ? classes.hide : ''}
                  >
                    <MenuIcon />
                  </IconButton>
                  <DrawerMenu open={open} handleDrawerMenu={handleDrawerMenu} />
                </>
              )}
              <Link to="/">
                <img src={logo} className={classes.badge} />
              </Link>
              {!forgotPassword && (
                <>
                  {isWidthUp('md', width) && <NestedMenu />}
                  <SearchMenu content={width} />
                </>
              )}
            </Grid>
            {!forgotPassword && (
              <Grid
                item
                xs={12}
                sm={2}
                md={4}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                {isWidthUp('sm', width) && <CartMenu />}
                {authentication ? (
                  <AppBarAuth />
                ) : (
                  isWidthUp('md', width) && (
                    <>
                      <DialogCustom
                        title="Login"
                        button={
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            disableElevation
                            className={classes.button}
                            id="login"
                          >
                            Login
                          </Button>
                        }
                        content={<Login />}
                      />
                      <DialogCustom
                        title="Sign Up"
                        button={
                          <Button
                            variant="contained"
                            color="secondary"
                            size="medium"
                            disableElevation
                            className={classes.button}
                            id="signUp"
                          >
                            Sign Up
                          </Button>
                        }
                        content={<SignUp />}
                      />
                    </>
                  )
                )}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default compose(withStyles(styles), withWidth())(index);
