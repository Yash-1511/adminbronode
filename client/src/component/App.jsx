import { Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import theme from '../commons/Theme';
import { messaging } from '../init-fcm';
import Cart from './Cart';
import Category from './Category/Category.jsx';
import Checkout from './Checkout';
import Course from './Course';
import CourseLearn from './CourseLearn';
import Header from './Header';
import Home from './Home/Home.jsx';
import InfoUser from './InfoUser';
import Footer from './Layout/Footer/Footer.jsx';
import PrivateRoute from './Layout/PrivateRoute';
import ResetPassword from './Layout/ResetPassword';
import MyCourses from './MyCourses';
import Search from './Search';
import Topic from './Topic';
import { registerGroupUser } from '../commons/CreateGroupUser';
import logo from '../../public/img/logo-black.png';

const App = () => {
  const getTokenFirebase = async () => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        registerGroupUser(token);
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });

    navigator.serviceWorker.addEventListener('message', (message) => {
      const msg = message.data['firebase-messaging-msg-data'];

      if (msg) {
        const { title, body } = msg.data;

        var notification = new Notification(title, {
          icon: logo,
          body,
        });
      }
    });
  };

  React.useEffect(() => {
    getTokenFirebase();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route exact path="/cart" children={<Cart />} />
          <Route exact path="/category/:id" children={<Category />} />
          <Route exact path="/topic/:id" children={<Topic />} />
          <Route exact path="/course/:id" children={<Course />} />
          <Route exact path="/courses/search" children={<Search />} />
          <Route
            exact
            path="/user/reset-password/:token"
            children={<ResetPassword />}
          />
          {/* -------Private------- */}
          <PrivateRoute exact path="/user/edit-acount">
            <InfoUser />
          </PrivateRoute>
          <PrivateRoute exact path="/cart/checkout">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute exact path="/my-courses">
            <MyCourses />
          </PrivateRoute>
          <PrivateRoute exact path="/course/:id/learn">
            <CourseLearn />
          </PrivateRoute>

          {/* --------404------- */}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

const NoMatch = () => {
  let location = useLocation();

  return (
    <React.Fragment>
      <Toolbar />
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    </React.Fragment>
  );
};

export default App;
