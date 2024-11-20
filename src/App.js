import React from "react";
import { BrowserRouter } from "react-router-dom";
import Rotas from './components/Rotas'
import {MyProvider} from './components/Context'

const App = () => {

  

  return (
   <BrowserRouter>
   <MyProvider>

    <Rotas/>
   </MyProvider>
   </BrowserRouter>
  );
};

export default App;
