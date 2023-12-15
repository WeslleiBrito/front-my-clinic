import React from 'react';
import './App.css';
import { GlobalDataProvider } from './context/globalData';
import { Router } from './Routes/Router';
import { GlobalStyle } from './globalStyled';


const App: React.FC = () => {
  
  return(
      <GlobalDataProvider>
        <GlobalStyle/>
        <Router/>
      </GlobalDataProvider>
  )
};



export default App;
