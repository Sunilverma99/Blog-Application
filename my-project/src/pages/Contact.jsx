import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Button} from "flowbite-react"
import {toast} from "react-hot-toast"
function Contact() {
 const[name,setName]=useState("");
 const[email,setEmail]=useState("");
const[subject,setSubject]=useState("");
const[message,setMessage]=useState("");
const handleSubmit=async(e)=>{
    e.preventDefault();
    const data={name,email,subject,message};
     const res=await fetch("/api/client",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     }
   )
   const resData=await res.json();
   if(resData.success||res.ok){
        toast.success("Your message has been sent successfully")
   }else{
    toast.error("Something went wrong")
   }
}
const navigateToLinkedIn = () => {
    window.open('https://www.linkedin.com/in/sunil-verma-b7985024a', '_blank');
};
const navigateToInstagram=()=>{
    window.open('https://www.instagram.com/sunil_verma_hr20?igsh=MW83N2g5MWJjMGhpNw==',"_blank")
}
const navigateToGithub=()=>{
    window.open("https://github.com/Sunilverma99","_blank")
}

  return (
    <div class=" p-12 grid sm:grid-cols-2 items-center gap-16 my-6 mx-auto max-w-4x text-[#333] dark:text-white font-[sans-serif]">
    <div>
        <h1 class="text-3xl  font-extrabold animate-bounce">Let's Talk</h1>
        <p class="text-sm text-gray-400 mt-3">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p>
        <div class="mt-12">
            <h2 class="text-lg font-extrabold">Email</h2>
            <ul class="mt-3">
                <li class="flex items-center">
                    <div class=" bg-zinc-200 dark:bg-white  h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                            viewBox="0 0 479.058 479.058">
                            <path
                                d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                data-original="#000000" />
                        </svg>
                    </div>
                    <a href="javascript:void(0)" class="text-[#007bff] text-sm ml-3">
                        <small class="block">Mail</small>
                        <strong>22254@iiitu.ac.in</strong>
                    </a>
                </li>
            </ul>
        </div>
        <div class="mt-12">
            <h2 class="text-lg font-extrabold">Socials</h2>
            <ul class="flex mt-3 space-x-4">
                <li onClick={navigateToGithub} class=" bg-zinc-200 dark:bg-white h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 24 24">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 5.303 3.438 9.791 8.207 11.386.6.111.82-.259.82-.579 0-.287-.01-1.045-.016-2.05-3.338.724-4.042-1.521-4.042-1.521-.546-1.383-1.333-1.752-1.333-1.752-1.089-.741.083-.726.083-.726 1.205.085 1.838 1.236 1.838 1.236 1.07 1.832 2.807 1.303 3.495.997.108-.776.418-1.303.761-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.312.468-2.382 1.236-3.227-.124-.304-.536-1.527.117-3.183 0 0 1.01-.324 3.3 1.235a11.54 11.54 0 0 1 3-.405c1.018 0 2.038.136 3 .405 2.287-1.56 3.297-1.235 3.297-1.235.654 1.656.242 2.879.118 3.183.77.846 1.235 1.915 1.235 3.227 0 4.609-2.806 5.624-5.478 5.922.43.372.813 1.104.813 2.223 0 1.607-.014 2.901-.014 3.298 0 .322.216.697.825.578C20.565 21.786 24 17.301 24 12c0-6.6-5.4-12-12-12z"/>
</svg>

                </li>
                <li class=" bg-zinc-200 dark:bg-white  h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <Link onClick={navigateToLinkedIn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                            viewBox="0 0 511 512">
                            <path
                                d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                                data-original="#000000" />
                        </svg>
                    </Link>
                </li>
                <li onClick={navigateToInstagram} class=" bg-zinc-200 dark:bg-white  h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <a href="javascript:void(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                            viewBox="0 0 24 24">
                            <path
                                d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z">
                            </path>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <form onSubmit={handleSubmit} class="ml-auo space-y-4">
        <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Name'
            class="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black text-sm outline-[#007bff]" />
        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'
            class="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black  text-sm outline-[#007bff]" />
        <input type='text' onChange={(e)=>setSubject(e.target.value)} placeholder='Subject'
            class="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black  text-sm outline-[#007bff]" />
        <textarea placeholder='Message' onChange={(e)=>setMessage(e.target.value)} rows="6"
            class="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 dark:text-black  outline-[#007bff]"></textarea>
          <Button type='submit' gradientDuoTone="purpleToBlue" className='w-full'>Send</Button>
    </form>
</div>
  )
}

export default Contact