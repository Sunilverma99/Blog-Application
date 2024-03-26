import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react'; // Assuming you have a Table component
import { useSelector } from 'react-redux';
import {Link } from 'react-router-dom'

export default function YourComponent() {
    const {currentUser} = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    console.log(posts)
    useEffect(() => {
      const fetchPosts = async () => {
          try {
              // Check if currentUser and its _id property are defined
              if (currentUser && currentUser._id) {
                  const response = await fetch(`/api/post/posts?userId=${currentUser._id}`, {
                      method: "GET"
                  });
                  const data = await response.json();
                  if (response.ok) {
                      setPosts(data.posts);
                  }
              } else {
                  console.log("currentUser or currentUser._id is undefined");
              }
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchPosts();
  }, [currentUser._id]); // Add currentUser as a dependency to re-run the effect when it changes
  

    return (
        <div className="overflow-x-auto mx-auto w-full p-2">
            <Table >
                <Table.Head>
                    <Table.HeadCell>Date updated</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                {posts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'>
                  <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slag}`}>
                      <img
                        src={post.photoUrl}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slag}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
            </Table>
        </div>
    );
}
