import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import logo from './assets/logoNav.png'

function App() {
  return (
    <div className="App">
      <div className="navBar">
        <img src={logo} className="navLogo"></img>
        <p>This is the nav bar</p>
      </div>
      <div className="router">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login/>}></Route> 
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
