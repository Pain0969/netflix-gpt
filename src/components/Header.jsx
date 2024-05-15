import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const signOutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/errorPage");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL : photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }

      //unsubscribe when the components unmount
      return ()=>unsubscribe();
    });
  },[])

  return (
    <div className='absolute w-full py-2 px-8 bg-gradient-to-b from-black flex justify-between'>
      <img className='w-40'
      src={NETFLIX_LOGO} alt='logo' />
      {
        user && (<div className='flex'>
        <img className='h-10 w-10 my-auto' src={user?.photoURL}/>
        <button onClick={signOutHandler}> Sign out</button>
      </div>)
      }
    </div>
  )
}

export default Header;