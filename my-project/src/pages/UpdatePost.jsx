import { Select, TextInput,FileInput,Button } from 'flowbite-react'
import React ,{ useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../../firebase';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useDispatch, useSelector } from 'react-redux';
export default function UpdatePost() {
const {postId}=useParams();
  
  const[files,setFiles]=useState([]);
  const[formData,setFormData]=useState({});
  const[imageUpload,setImageUpload]=useState(false);
  const[imageUploadProgress,setImageUploadPorgress]=useState(null);
  const[imageUploadError,setImageUploadError]=useState(null);
  const [imageUrl,setImageUrl]=useState(formData.photoUrl||null);
  const [imageIspresent,setImageIsPresent]=useState(false);
  const[currentPostId,setCurrentPostId]=useState('');
 const navigate=useNavigate();
 const{currentUser}=useSelector((state)=>state.user)

 const handleImageUpload=async()=>{
  setImageUpload(true);
  if(!imageUrl){setImageIsPresent(false)}
  setImageUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + files.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,files);
 
  uploadTask.on('state_changed',
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setImageUploadPorgress(progress.toFixed(0));
    console.log(progress.toFixed(0));
  },(error) => {
    setImageUpload(false);
    toast.error("Image upload failed");
    setImageUploadError(
      'Image upload failed (File must be less than 2MB))'
    );
    setImageUploadPorgress(null);
    setImageUrl(null);
    setFiles(null);
    setImageUpload(false);
  },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      toast.success("Image uploaded successfully");
      setImageUrl(downloadURL);
      setFormData({...formData,photoUrl:downloadURL})
      setImageUpload(false);
      setImageIsPresent(true);
      console.log(downloadURL)
    });
  } );
  
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!formData.title||!formData.content||formData.title===""||formData.content===""){
    return toast.error("Please fill all the fields")
  }
  try{
    const res=await fetch(`/api/post/update-post/${postId}/${currentUser._id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    const data=await res.json();
    if(res.ok){
      console.log(data);
      toast.success("Post updated successfully");
    }
    else{
      toast.error("Post update failed")
    }
  }catch(error){
    toast.error("Post update failed");
  }
}
console.log(formData)
useEffect(() => {
  const fetchPosts = async () => {
     try {

         // Check if currentUser and its _id property are defined
         if (currentUser && currentUser._id) {
             const response = await fetch(`/api/post/posts?postId=${postId}`, {
                 method: "GET"
             });
             const data = await response.json();
             if (response.ok) { 
              setFormData(data.posts[0]);
             }
         } else {
             console.log("please try again ");
         }
     } catch (error) {
         console.log(error);
     }
 };
 if(currentUser && currentUser.isAdmin){ // Add a condition here to prevent infinite loop
   fetchPosts();
 }
}, [postId]); 
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1'
           value={formData.title}
          onChange={(e)=>setFormData({...formData,title:e.target.value})}
        />
        <Select
        id='category'
       value={formData.category}
        onChange={(e)=>setFormData({...formData,category:e.target.value})}
        >
          <option value='uncategorized'>Select a category</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Sports'>Sports</option>
          <option value='News'>News</option>
        </Select>
      </div>
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput
          type='file' 
          accept='image/*'
          onChange={(e)=>setFiles(e.target.files[0])}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={()=>{handleImageUpload()}}
        >{
          imageUpload?(
           
            <div className='flex  w-10 h-10 items-center'>
              <CircularProgressbar
              value={imageUploadProgress||0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}/>
            </div>
          ):( "Upload " )
        }
        </Button>
      </div>
      {imageIspresent|| formData.photoUrl && (
        <img src={formData.photoUrl} alt="postImage" className='w-full h-72 object-cover rounded-lg border-teal-600 border-4'/>
      )}
      
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12'
        required
        value={formData.content}
        onChange={(value)=>setFormData({...formData,content:value})}
      />
      <Button type='submit' gradientDuoTone='purpleToPink'>
        Publish
      </Button>
    </form>
  </div>
  )
}
