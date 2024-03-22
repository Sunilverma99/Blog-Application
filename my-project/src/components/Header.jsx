import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2 w-screen h-screen px-10'>
  <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
      Sunil's Blog
    </span>
  </Link>
  <form>
    <TextInput 
      type='text'
      placeholder='Search...'
      className='hidden lg:inline  '
    />
  </form>
  <Button className='w-12 h-10 lg:hidden' color='gray' pill>
    <AiOutlineSearch />
  </Button>
  <div className='flex gap-2 md:order-2 py-1'>
    <Button
      className='w-12 h-10 sm:flex hidden '
      color='gray'
     pill
    >
    <FaMoon />
    </Button>
    <Link to='/sign-in'>
    <button class=" w-13 h-10  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-in
</span>
</button>

    </Link>
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse >
    <Navbar.Link active={path === '/'} as={'div'}>
      <Link to='/' >Home</Link>
    </Navbar.Link>
    <Navbar.Link active={path === '/about'} as={'div'}>
      <Link to='/about'>About</Link>
    </Navbar.Link>
    <Navbar.Link active={path === '/projects'} as={'div'}>
      <Link to='/projects'>Projects</Link>
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>


  );
}