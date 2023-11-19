import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Holidays from './Pages/Holidays/Holidays';
import App from './App';
import Countries from './Pages/Countries/Countries';

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
