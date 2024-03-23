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


  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result);

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                userName: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
            }),
        };
        // Ensure the user actually signed in
        if (result.user) {
            const res = await fetch('/api/auth/google', config);
            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                toast.error("Please try again");
                return;
            }

            dispatch(setUser
                
                (data));
            toast.success("You are logged in successfully")
            navigate('/');
        } else {
            toast.error('Please try again');
            console.error('User not signed in');
        }
    } catch (error) {
        console.error('Could not sign in with Google', error);
        toast.error("Please try again");
    }
};

  return (
    <Button onClick={handleGoogleClick} type='button' outline gradientDuoTone="pinkToOrange">
      Continue with Google
    </Button>
  );
}