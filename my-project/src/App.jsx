import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx'
import Signin from './pages/Sign-in';
import Signup from './pages/Signup.jsx'
import Dashbord from './pages/Dashbored.jsx'
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute .jsx";
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import { Toaster } from 'react-hot-toast';
import Post from './pages/Post.jsx';
import Search from './pages/Search.jsx';
import About from './pages/About.jsx';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route  path="/" element={<Home/>}/>
       <Route  path="/contact" element={<Contact/>}/>
       <Route  path="/sign-in" element={<Signin/>}/>
       <Route  path="/sign-up" element={<Signup/>}/>
       <Route  path="/search" element={<Search/>}/>
       <Route  path="/about" element={<About/>}/>
       <Route  element={<PrivateRoute/>}>
       <Route  path="/dashboard" element={<Dashbord/>}/>
       </Route>
       <Route  element={<OnlyAdminPrivateRoute/>}>
       <Route  path="/create-post" element={<CreatePost/>}/>
       <Route path ="/update-post/:postId" element={<UpdatePost/>}/>
       </Route>
       <Route path='/post/:slag' element={<Post/>} />
    </Routes>
    <FooterCom/>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App