import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/user/userSlice';
import toast from 'react-hot-toast';
export default function DashSidebar() {
    const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut=async()=>{
    try{
      const res=await fetch('/api/user/signout',{
        method:"POST"
      });
      const data=await res.json();
      console.log(data);
      if(!res.ok||res.status!==200){
        toast.error(data.message);
      }else{
        toast.success("Sign out successfully");
        dispatch(setUser(null));
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <Sidebar  className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup  className='flex flex-col gap-1'>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label= {currentUser.isAdmin ?"Admin":"User"}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
        {  currentUser.isAdmin&&
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === 'posts'}
              icon={HiDocumentText}
              labelColor='dark'
              as='div'
            >
              Posts
            </Sidebar.Item>
          </Link>
          
}        
{  currentUser.isAdmin&&
          <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === 'users'}
              icon={HiDocumentText}
              labelColor='dark'
              as='div'
            >
              Users
            </Sidebar.Item>
          </Link>
          
}        

          <Sidebar.Item  icon={HiArrowSmRight}
            className='cursor-pointer' onClick={handleSignOut}>
              
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
