import './App.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <div className="header" />
      <Outlet />
      <div className="footer" />
    </div>
  );
};

export default App;
