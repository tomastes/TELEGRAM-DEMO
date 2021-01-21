import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './Components/Login';
import { Telegram } from './Components/Telegram';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //login
        dispatch(
          login({
            uid:authUser.uid,
            photo:authUser.photoURL,
            email:authUser.email,
            displayName:authUser.displayName
          })
        )
      }else{
        //logout
        dispatch(logout())
      }
    })
  },[dispatch])
  return (
    <div className="App">
      {user?<Telegram />:<Login />}

    </div>
  );
}

export default App;
