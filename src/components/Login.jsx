import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { CUSTOM_LOGO, NETFLIX_BG } from '../utils/constants';


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  function SignInRegisterToggleBtn(){
    setIsSignIn(!isSignIn);
  }

  function clickHandler(){
    // console.log(name.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  
    if(message) return;

    // !isSignIn= Register page $ isSignIn= Sign In page
    if(!isSignIn){
      //Register logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value , photoURL: 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
          }).then(() => {    
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL : photoURL}));
            
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    else{
      //Sign In logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header/>
      <div>
        <img
        src={NETFLIX_BG} alt='logo'/>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black mx-auto top-0 left-0 right-0 my-28 rounded-lg bg-opacity-70'>
        <h1 className='text-3xl text-white py-4 font-bold'>{isSignIn ? "Sign In" : "Register Now"}</h1>

        {
          !isSignIn && <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 text-white'/>
        }

        <input ref={email} type='email' placeholder='Email or mobile number' className='p-4 my-4 w-full bg-gray-700 text-white'/>

        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 text-white'/>

        <p className='text-red-700'>{errorMessage}</p>

        <button onClick={clickHandler} className='bg-red-700 w-full px-4 py-2 my-6 rounded-lg'>{isSignIn ? "Sign In" : "Register"}</button>

        <input type='checkbox' id='remember'/>
        <label htmlFor='remember' className='text-white'>Remember me</label>

        <p onClick={SignInRegisterToggleBtn} className='text-md text-white py-4 cursor-pointer'>{isSignIn ? "New to Netflix? Register now." : "Click here to Sign In!"}</p>
      </form>
    </div>
  )
}

export default Login;