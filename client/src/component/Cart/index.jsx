import React from 'react';
import Jumbotron from '../Layout/Jumbotron/Jumbotron';
import { Toolbar } from '@material-ui/core';
import Cart from '../Layout/Cart';

const index = () => {
  return (
    <>
      <Toolbar />
      <Jumbotron category="Cart" />
      <Cart />
    </>
  );
};

export default index;
