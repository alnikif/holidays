import './App.scss';
import Countries from './components/Countries';
import Holidays from './components/Holidays';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <div className='header'></div>
      <Outlet />
      <div className='footer'></div>
    </div>
  );
}

export default App;
