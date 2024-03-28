import React, { useEffect, useState } from 'react'
import { Label, Textarea,Button,Modal } from "flowbite-react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Comments from './Comments.jsx';
import { useNavigate } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function Comment({postId,currentUser}) {
    const[comment,setComment]=useState('');
    const[commentError,setCommentError]=useState(null);
    const[comments,setComments]=useState([]);
    const[showModal,setShowModal]=useState(false);
    const[comentToDelete,setCommentToDelete]=useState('');
    const navigate=useNavigate()
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
            setComments([...comments,data])
            setComment("");
        }
       
    } catch (error) {
        console.log(error);
        toast.error("Pleae try again Later");
    }
  }
  const handleLikes=async({comment})=>{
     try {
      console.log(comment)
       const res=await fetch(`/api/comment/countLikes/${comment._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
         body:JSON.stringify({
           comment
         })
       })
       const data=await res.json();
       if(res.ok){
        console.log(data);
        setComments(comments.map((c)=>c._id===comment._id?data:c))
       }
      
     } catch (error) {
       console.log(error);
       toast.error("You can not like this comment")
     }
  }
  const handleEditComment=async({comment,editiedComment})=>{
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, comment: editiedComment } : c
      )
    );
    
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
 
 const deleteComment=async(commentId)=>{
  console.log("haryana");
  setShowModal(false);
    if(!currentUser){
      toast.error("You must be signed in to delete this comment")
      return navigate('/sign-in')
    }
    try{
      const res=await fetch(`/api/comment/delete-comment/${commentId}`,{
        method:"DELETE",
      })
      const data=await res.json();
      console.log(data)
      if(res.ok){
        toast.success("Comment deleted successfully");
        setComments(comments.filter((c)=>c._id!==commentId))
      }
    }catch{
      console.log(error);
      toast.error("Pleae try again");
    }
 }
  return (
    <>
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
          <Comments key={comment._id} comment={comment} LikeComment={handleLikes} editComment={handleEditComment} onDelete={(commentId)=>{
            setShowModal(true);
            console.log(showModal);
            setCommentToDelete(commentId);
          }}/>
          
        ))
          ):(<p>No comment yet</p>
          )}
        </>
      )}
       { showModal &&   <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete your comment?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={() => deleteComment(comentToDelete)}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          }
          
      </div>
    
      
      </>
  )
}
