import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts.jsx'
import DashUsers from '../components/DashUsers.jsx';
import DashComments from '../components/DashComments.jsx';
import DashboredComp from '../components/DashboredComp.jsx';

function Dashbored() {
  const location=useLocation();
  const[tab,setTab]=useState('');
  useEffect(()=>{
    const urlParms=new URLSearchParams(location.search);
    const tabFromUrl=urlParms.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar/>
      </div>
      {tab==='profile'&& <DashProfile/>||
      tab==='posts'&& <DashPosts/>||
      tab==='users'&&<DashUsers/>||
      tab==='comments'&&<DashComments/>||
      tab==='dash' &&<DashboredComp/>}

    </div>
  )
}

export default Dashbored