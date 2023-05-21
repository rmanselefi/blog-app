import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) =>
  localStorage.getItem('token') ? <Outlet /> : <Navigate to="/" />;


export default PrivateRoute;
