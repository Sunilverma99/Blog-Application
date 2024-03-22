import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx'
import Signin from './pages/Sign-in';
import Signup from './pages/Signup.jsx'
import Dashbord from './pages/Dashbored.jsx'
function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route  path="/" element={<Home/>}/>
       <Route  path="/projects" element={<Projects/>}/>
       <Route  path="/sign-in" element={<Signin/>}/>
       <Route  path="/sign-up" element={<Signup/>}/>
       <Route  path="/dashbored" element={<Dashbord/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App