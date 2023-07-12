//imports generales 
import './App.css';
import axios from 'axios';

//Hooks 
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

//Views
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import Search from './views/Search/Search';
//Componentes 
import Nav from "./components/Nav/Nav"
function App() {
  //instancias 
  const location = useLocation()
  const navigate = useNavigate()





  return (
    <div className="App">
      {location.pathname !== '/' &&<Nav/>}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
