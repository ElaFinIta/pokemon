import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Pokelist from './Pokelist';
import Layout from './Layout';
import Home from './Home';
import './index.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/pokelist' element={<Pokelist/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;