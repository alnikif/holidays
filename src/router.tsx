import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Holidays from './components/Pages/Holidays/Holidays';
import App from './App';
import Countries from './components/Pages/Countries/Countries';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Countries />
      },
      {
        path: '/holidays/:countryId',
        element: <Holidays />
      }
    ]
  }
]);
