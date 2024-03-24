import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { setUser } from '../../redux/user/userSlice.js';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from "..//../firebase.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const[userName,setUserName]=useState(currentUser.userName);
  const[email,setEmail]=useState(currentUser.email);
  const[password,setPassword]=useState('');
  const[photoUrl,setPhotoUrl]=useState(currentUser.photoUrl);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
      console.log("hello");
    }
  }, [imageFile]);

  const uploadImage = async () => {
    
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setPhotoUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
 console. log(userName ,email,password ,photoUrl)
    if(userName===currentUser.userName&& email===currentUser.email&&password===currentUser.password&& photoUrl===currentUser.photoUrl){
      toast.error("Nothing is changed");
      return;
    }
      if (userName.length< 7 ||userName.length > 20) {
          toast.error('Username must be between 7 and 20 characters')
          return;
        }
      if (userName.includes(' ')) {
        toast.error('Username cannot contain spaces');
        return;
      }
      if (!userName.match(/^[a-zA-Z0-9]+$/)) {
        toast.error(
       'Username can only contain letters and numbers')
       return;
      }
    if (imageFileUploading) {
      toast.error('Please wait for image to upload');
      return;
    }
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName,email,password,photoUrl}),
      });
      const data = await res.json();
       dispatch(setUser(data));
      if (!res.ok) {
        setUpdateUserError(data.message);
      } else {
        setUpdateUserSuccess("User's profile updated successfully");
        toast.success("User's profile updated successfully")
      }
    } catch (error) {
      setUpdateUserError(error.message);
      toast.error(error.message);
    }
  };
  const handleDeleteUser=async()=>{
    setShowModal(false);
    try{
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data=await res.json();
      if(!res.ok){
        toast.error(data.message);
      }
      else{
        toast.success(data.message);
        dispatch(setUser(null));
      }
  }catch{
    toast.error("something went wrong plese try again");
  }
  }
  const handleSignOut=async()=>{
    try{
      const res=await fetch('/api/user/signout',{
        method:"POST"
      });
      const data=await res.json();
      console.log(data);
      if(!res.ok){
        toast.error(data.message);
      }else{
        toast.success("Sign out successfully");
        dispatch(setUser(null));
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          ref={filePickerRef}
          hidden
          onChange={handleImageChange}
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.photoUrl}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.userName}
          onChange={(e)=>{setUserName(e.target.value)}}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          defaultValue="*******"
          onChange={(e)=>{(setPassword(e.target.value))}}
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={ imageFileUploading}
        >
           Update
        </Button>
        {currentUser.isAdmin && 
        <Link to={'/create-post'}>
        <Button
        type='button'
        gradientDuoTone='purpleToPink'
        outline
        className='w-full'
      >
         Create a post
      </Button></Link>
        }
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span  className='cursor-pointer' onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
      <Modal
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
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
