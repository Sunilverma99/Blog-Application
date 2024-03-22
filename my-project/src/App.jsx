import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx'
import Signin from './pages/Sign-in';
import Signup from './pages/Signup.jsx'
import Dashbord from './pages/Dashbored.jsx'
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route  path="/" element={<Home/>}/>
       <Route  path="/projects" element={<Projects/>}/>
       <Route  path="/sign-in" element={<Signin/>}/>
       <Route  path="/sign-up" element={<Signup/>}/>
       <Route  path="/dashbored" element={<Dashbord/>}/>
    </Routes>
    <FooterCom/>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App