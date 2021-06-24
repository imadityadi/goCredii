import React from 'react';
import App from './App';
import { Provider } from 'react-redux'
import store from './src/Redux/store'

const RootApp = () => {
  return (
    <Provider store= {store}>
        <App/>
        
    </Provider> 
    
  );
};

export default RootApp;
   
  



