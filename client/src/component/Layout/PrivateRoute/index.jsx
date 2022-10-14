import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const index = ({ children, ...rest }) => {
  const checkLogin = localStorage.getItem('login');

  return (
    <Route
      {...rest}
      render={({ location }) =>
      checkLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default index;
