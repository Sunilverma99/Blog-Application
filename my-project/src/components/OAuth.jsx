import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '..//../firebase.js';
import { useDispatch } from 'react-redux';
import { setUser } from '..//../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app)


  const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
        const resultsFromGoogle = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                photoURL: resultsFromGoogle.user.photoURL,
            }),
            })
        const data = await res.json()
        if (res.ok){
            dispatch(setUser(data))
            navigate('/')
        }
    } catch (error) {
        toast.error("Pleae try again later");
        console.log(error);
    }
} 

  return (
    <Button onClick={handleGoogleClick} type='button' outline gradientDuoTone="pinkToOrange">
      Continue with Google
    </Button>
  );
}