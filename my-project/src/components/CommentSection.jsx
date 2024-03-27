import React, { useEffect, useState } from 'react'
import { Label, Textarea,Button } from "flowbite-react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Comments from './Comments.jsx';
export default function Comment({postId,currentUser}) {
    const[comment,setComment]=useState('');
    const[commentError,setCommentError]=useState(null);
    const[comments,setComments]=useState([]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(comment.length<1){
        setCommentError("Comment can not be empty");
       return toast.error("Comment can not be empty");
    }
    try { 
        const res=await fetch('/api/comment/add-comment',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                postId,
                comment,
                userId:currentUser._id
            })
        } )
        const data=await res.json();
        if(res.ok){
            toast.success("Comment added successfully");
            console.log(data);
        }
       
    } catch (error) {
        console.log(error);
        toast.error("Pleae try again Later");
    }
  }
  useEffect(()=>{
    const fetchComments=async()=>{
      try {
       const res=await fetch(`/api/comment/getAllComments/${postId}`,{
         method:"GET",
       });
       const data=await res.json();
       if(res.ok){
         setComments(data);
       }
      } catch (error) {
        console.log(error);
        toast.error("Please try again Later");
      }
    }
    fetchComments();
 },[postId])
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.photoUrl}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.userName}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <>
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
        </form>
        <div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
        {comments.length>0?(comments.map((comment)=>(
          <Comments key={comment._id} comment={comment}/>
        ))
          ):(<p></p>)}
        </>
      )}
      </div>
  )
}
