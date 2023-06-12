//imports generales 
import './App.css';
import axios from 'axios';

//Hooks 
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

//Views
import Landing from "./views/Landing";

//Componentes 
import Nav from "./components/Nav/Nav"
function App() {
  
  
  
  
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Landing/>}/>

      </Routes>
      <h1>Henry Food</h1>
    </div>
  );
}

export default App;
