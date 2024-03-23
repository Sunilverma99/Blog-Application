import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';


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
    </div>
  )
}

export default Dashbored