import React from 'react';
import './App.css';
import { GlobalDataProvider } from './context/globalData';
import { Router } from './Routes/Router';


const App: React.FC = () => {
  
  return(
    <GlobalDataProvider>
      <Router/>
    </GlobalDataProvider>
  )
};



export default App;
