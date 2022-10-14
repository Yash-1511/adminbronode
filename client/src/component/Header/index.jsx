import React from 'react';
import AppBar from '../Layout/AppBar/AppBar';
import AppBarLearn from '../Layout/AppBarLearn';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/AuthAction';

const index = () => {
  const { pathname } = useLocation();
  const { authentication } = useSelector((state) => ({
    authentication: state.auth.authentication,
  }));
  const dispatch = useDispatch();

  React.useMemo(() => {
    if (!authentication && localStorage.getItem('login')) dispatch(loadUser());
  }, [authentication]);

  return pathname.match(/^\/course.*?\/learn$/) ? <AppBarLearn /> : <AppBar />;
};

export default index;
