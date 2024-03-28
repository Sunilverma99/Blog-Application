import React, { useEffect, useState } from 'react';
import { Button, Table,Modal } from 'flowbite-react'; // Assuming you have a Table component
import { useSelector } from 'react-redux';
import {Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { MdGroups2 } from "react-icons/md";

import { HiOutlineExclamationCircle,HiOutlineCheck ,HiXCircle } from 'react-icons/hi';
export default function DashUsers() {
    const {currentUser} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const[showMore,setShowMore]=useState(false);
    const[showModal,setShowModal]=useState(false);
    const[deleteUserId,setDeleteUserId]=useState("");
    useEffect(() => {
  const fetchUsers = async () => {
          try {
              // Check if currentUser and its _id property are defined
              if (currentUser && currentUser._id) {
                  const response = await fetch(`/api/getAllUsers`, {
                      method: "GET"
                  });
                  const data = await response.json();
                  if (response.ok) {
                    
                      setUsers(data.allUsers);
                      if(data.totalUsers<9){
                        setShowMore(false);
                      }else{
                        setShowMore(true)
                      }
                      
                  }
              } else {
                  console.log("currentUser or currentUser._id is undefined");
              }
          } catch (error) {
              console.log(error);
          }
      };
   if(currentUser.isAdmin && users.length===0){
    fetchUsers();
   }
  }, [currentUser.id]); // Add currentUser as a dependency to re-run the effect when it changes
  
  const handleShowMore= async()=>{
      setShowMore(false);
      try {
        const res=await fetch(`/api/getAllUsers?startIndex=${users.length}`,{
          method:"GET"
        })
        const data= await res.json();
        if(res.ok){
          if(data.allUsers.length<9){
            setShowMore(false);
          }else{
            setShowMore(true)
          }
          setUsers([...users,...data.allUsers]);
        }
      }catch(error){
         toast.error('Failed to Load More Posts')
      }
  }
  const handleDeletePost=async()=>{
       setShowModal(false);
       try{
         const res=await fetch(`/api/user/delete/${deleteUserId}`,{
           method:"DELETE"
         });
         const data=await res.json();
         if(res.ok&&data.success||res.status===200){
           toast.success("User Deleted Successfully");
           setUsers(users.filter(user=>user._id!==deleteUserId));
        }else{
         toast.error("Failed to delete post");
         }
     }catch(error){
         console.log(error);
         toast.error("Failed to delete post");
       }
  }
  
    return (
        <div className="overflow-x-auto mx-auto w-full p-2">
            <Table >
                <Table.Head>
                    <Table.HeadCell>Date created</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users&&users.map((user) => (
              <Table.Body key={user._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'>
                  <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={``}>
                      <img
                        src={user.photoUrl}
                        alt={user.userName}
                        className='w-8 h-8 object-cover rounded-full bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={``}
                    >
                      {user.userName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin?(<HiOutlineCheck className=' text-green-500 text-lg' />):(<HiXCircle className='text-red-400 text-lg' />)}</Table.Cell>
                  <Table.Cell>
                    <span

                    onClick={()=>{setShowModal(true),setDeleteUserId(user._id)}}
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
                  Are you sure you want to delete your post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeletePost}>
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

