import React from 'react'
import {Label ,TextInput ,Button } from "flowbite-react"
import { Link } from 'react-router-dom'
function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-5  flex-col md:flex-row md:items-center'>
         <div className='flex-1'>
         <Link to='/' className=' text-5xl text-black   font-bold dark:text-white'>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
      Sunil's
    </span>Blogs
  </Link>
  <p className='m-4 text-teal-800 text-xl italic'>To see the my blogs Please sign up using email or a Google account</p>
         </div>
         <div className='flex-1'>
          <form className='flex flex-col gap-4' >
           <Label >Your Username</Label>
           <TextInput 
              type='text'
              placeholder="Username"
              id='userName'
            />
            <Label >Your Email</Label>
           <TextInput 
              type='text'
              placeholder="name@company.com"
              id='email'
            />
            <Label >Your Password</Label>
           <TextInput 
              type='text'
              placeholder="Password"
              id='password'
            />
             <Button outline  gradientDuoTone="purpleToPink" >
        Sign up
      </Button>
          </form>
         </div>
      </div>
    </div>
  )
}

export default Signup