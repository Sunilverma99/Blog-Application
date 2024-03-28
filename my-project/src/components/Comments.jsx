
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Textarea,Button } from 'flowbite-react';
import toast from 'react-hot-toast';
export default function Comments({comment,LikeComment,editComment,onDelete}) {
    const[user,setUser]=useState(null);
    const{currentUser}=useSelector((state)=>state.user);
    const [isEditing,setIsEditing]=useState(false);
    const[editedComment,setEdititedComment]=useState(comment.comment);
useEffect(()=>{
    const fetchCommentUser=async()=>{
        const res=await fetch(`/api/getUser/${comment.userId}`);
        const data=await res.json();
         if(res.ok){
            setUser(data);
         }
    }
    fetchCommentUser();
},[comment]);
const handleEdit= async()=>{
 setIsEditing(true);
  setEdititedComment(comment.comment)
  console.log(isEditing)
}
const handleSave=async()=>{
  try{
    const res=await fetch(`/api/comment/edit-comment/${comment._id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        comment:editedComment
      })
    })
    const data=await res.json();
    if(res.ok){
      setIsEditing(false);
      editComment(comment, editedComment);
      toast.success("Comment edited successfully");
    }
  }catch(error){
    console.log(error);
    toast.error(error.message)
  }
}
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
    <div className='flex-shrink-0 mr-3'>
      <img
        className='w-10 h-10 rounded-full bg-gray-200'
        src={user&&user.photoUrl}
        alt={user&&user.userName}
      />
    </div>
    <div className='flex-1'>
      <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>
          {user ? `@${user.userName}` : 'anonymous user'}
        </span>
        <span className='text-gray-500 text-xs'>
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
      
      {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedComment}
              onChange={(e) => setEdititedComment(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
          <p className='text-gray-500 pb-2'>{comment.comment}</p>
      <div className='flex items-center max-w-fit border-t-2  border-gray-200 dark:border-gray-700  gap-2'>
        <button className='' onClick={()=>LikeComment({comment})}> <BiSolidLike className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser&&currentUser._id) &&
                  '!text-blue-500'
                }`} /></button>
     
      {comment.numberOfLikes<2?(<p className=' text-xs text-gray-400'>{comment.numberOfLikes+" "} like</p>):(<p className=' text-xs text-gray-400'>{comment.numberOfLikes+" "} likes</p>)}
      
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                     onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                     onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
          
          </>
        )}
      </div> 
      
      </div>
   
  )
}
