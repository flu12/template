import React from 'react';

import HomePage from "./pages/homePage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

export const routes = (userInfo) => {
  return [
    {
      path: '/',
      component: HomePage,
      isAvailable: () => true,
    },
    {
      path: '/register',
      component: Register,
      showInMenu: false,
      isAvailable: () => true,
    },
    {
      path: '/login',
      component: Login,
      showInMenu: false,
      isAvailable: () => true,
    },
  ]
};

export const getAvailableRoutes = (userInfo = {}) => {
  return routes(userInfo).filter(route => route.isAvailable(userInfo));
};

