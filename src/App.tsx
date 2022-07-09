import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages';
import Home from './pages/home/Home';

function App(): JSX.Element{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route index element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
