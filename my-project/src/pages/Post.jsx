import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import WebsiteAdds from '../components/WebsiteAdds.jsx';
import { Spinner,Button } from 'flowbite-react';
import CommentSection from '../components/CommentSection.jsx'
import { useSelector } from 'react-redux';
import PostCard from "../components/PostCard.jsx"
export default function Post() {
   const{currentUser}=useSelector((state)=>state.user);
   //console.log(currentUser);
    const[loading,setLoading]=useState(false);
    const[post,setPost]=useState(null);
    const[recentPosts,setRecentPosts]=useState([]);
    const[error,setError]=useState(false);
    const {slag}=useParams();
    console.log()
    useEffect(()=>{
        const fetchPost=async()=>{
            setLoading(true);
            try{
                const res=await fetch(`/api/post/posts?slag=${slag}`);
                const data=await res.json();
                if(res.ok){
                    setLoading(false)
                    setPost(data.posts[0]);
                    console.log(data.posts[0])
                }
            }catch(error){
                console.log(error)
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    },[slag])
    useEffect(()=>{
      const fetchRecentPosts=async()=>{
    
        try {
           const res=await fetch(`/api/post/posts?limit=3`,{
            method:"GET",
           });
           const data=await res.json();
           if(res.ok){
            setRecentPosts(data.posts);
            console.log(data)
           }
        } catch (error) {
           console.log(error)
        }
      }
      fetchRecentPosts();
     },[])
    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    return (
      
        <main 
        className='p-3 flex flex-col max-w-8xl mx-auto min-h-screen'>
          <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className='self-center mt-5'
          >
            <Button color='gray' pill size='xs'>
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.photoUrl}
            alt={post && post.title}
            className='mt-10 p-3 max-h-[600px] w-full object-cover'
          />
          <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className='p-3 max-w-2xl mx-auto w-full post-content'
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          >

          </div>
           <div><WebsiteAdds/></div>
           <CommentSection currentUser={currentUser} postId={post&&post._id}/>

    
          <div className='flex flex-col justify-center items-center mb-5 '>
            <h1 className='text-xl mt-5'>Recent articles</h1>
            <div className='flex flex-wrap gap-5 mt-5 justify-center'>
              {recentPosts &&
                recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          </div>
        </main>
    );

}
