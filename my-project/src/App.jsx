import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx'
import Signin from './pages/Sign-in';
import Signup from './pages/Signup.jsx'
import Dashbord from './pages/Dashbored.jsx'
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute .jsx";
import CreatePost from './pages/CreatePost.jsx';
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
       <Route  element={<PrivateRoute/>}>
       <Route  path="/dashboard" element={<Dashbord/>}/>
       </Route>
       <Route  element={<OnlyAdminPrivateRoute/>}>
       <Route  path="/create-post" element={<CreatePost/>}/>
       </Route>
    </Routes>
    <FooterCom/>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App