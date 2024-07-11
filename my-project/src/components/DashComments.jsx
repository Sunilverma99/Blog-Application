import React, { useEffect, useState } from 'react';
import { Button, Table,Modal } from 'flowbite-react'; // Assuming you have a Table component
import { useSelector } from 'react-redux';
import {Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashComments() {
    const {currentUser} = useSelector((state) => state.user);
    console.log(currentUser)
    const [comments, setComments] = useState([]);
    const[showMore,setShowMore]=useState(false);
    const[showModal,setShowModal]=useState(false);
    const[deleteCommentId,setDeleteCommentId]=useState("");
    useEffect(() => {
  const fetchPosts = async () => {
          try {
              // Check if currentUser and its _id property are defined
              if (currentUser && currentUser._id) {
                  const response = await fetch(`/api/comment/getComments`, {
                      method: "GET"
                  });
                  const data = await response.json();
                  if (response.ok) {
                    if(comments.length<9){
                      setShowMore(false);
                    }else{
                      setShowMore(true)
                    }
                      setComments(data.comments);
                      console.log(data)
                  }
              } else {
                  console.log("currentUser or currentUser._id is undefined");
              }
          } catch (error) {
              console.log(error);
          }
      };
   if(currentUser.isAdmin && comments.length===0){
    fetchPosts();
   }
  }, [currentUser.id]); // Add currentUser as a dependency to re-run the effect when it changes
  
  const handleShowMore= async()=>{
      setShowMore(false);
      try {
        const res=await fetch(`/api/comment/getComments?startIndex=${comments.length}`,{
          method:"GET"
        })
        const data= await res.json();
        if(res.ok){
          if(data.comments.length<9){
            setShowMore(false);
          }else{
            setShowMore(true)
          }
          setPosts([...comments,...data.comments]);
          
        }
      }catch(error){
         toast.error('Failed to Load More Posts')
      }
  }
  const handleDeleteComment=async()=>{
      setShowModal(false);
      try{
        const res=await fetch(`/api/comment/delete-comment/${deleteCommentId}`,{
          method:"DELETE"
        });
        const data=await res.json();
        console.log(data)
        if(res.ok){
          toast.success("Comment Deleted Successfully");
          setComments(comments.filter(comment=>comment._id!==deleteCommentId));
        }else{
          toast.error("Failed to delete comment");
        }
      }catch(error){
        console.log(error);
        toast.error("Failed to delete comment");
      }
  }
    return (
        <div className="overflow-x-auto mx-auto w-full p-2">
            <Table >
                <Table.Head>
                    <Table.HeadCell>Date updated</Table.HeadCell>
                    <Table.HeadCell>Comment content</Table.HeadCell>
                    <Table.HeadCell>Number of LIkes</Table.HeadCell>
                    <Table.HeadCell>User Id</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    
                </Table.Head>
                {comments.map((comment) => (
              <Table.Body key={comment._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'>
                  <Table.Cell>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                      {comment.comment}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.numberOfLikes}
                  </Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span

                    onClick={()=>{setShowModal(true),setDeleteCommentId(comment._id)}}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}
            </Table>
            {
              showMore && <button onClick={(handleShowMore)} className='text-teal-500 text-sm  rounded-lg px-3  flex justify-center mx-auto'>Show More </button>
            }
          {
            showModal &&   <Modal
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
                  Are you sure you want to delete this comment?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteComment}>
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
    );
}
