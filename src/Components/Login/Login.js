import React,{ useContext, useState, useEffect }  from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {Link} from 'react-router-dom'
import './login.css'

import Loader from '../Services/Loader';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

import UserContext from '../Services/UserContext';
import AssignmentsContext from '../Services/AssignmentsContext';

export default function Login() {

  const {user,LoggedIn,successLogin, setUserProfile, personLog} = useContext(UserContext)
  const {getAll, assignments} = useContext(AssignmentsContext)
  const [loader, setLoader] = useState({
    hide:true
  })
  const history = useHistory();
  const auth = getAuth();

  useEffect(()=>{
    

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    window.sessionStorage.clear()
    signOut(auth)
  })

  function LoginUser(e){
    e.preventDefault()
    console.log(user.email)
    setLoader({
      load:false
    })
    
    signInWithEmailAndPassword(auth, user.email, user.password).then((userInfo)=>{
      const personel = userInfo.user
      console.log(personel)
      // if(personel.uid !== null){
      //   LoggedIn(user.email)
      //   successLogin()
        
      //   console.log(user)
      //   console.log(personLog)
        
        
      // }

      swal('Login Successful', `Welcome ${user.email}`,'success').then(()=>{
        window.sessionStorage.setItem('user',JSON.stringify(user))
        window.sessionStorage.setItem('person',JSON.stringify(personel))
        
      })

      setLoader({
        load:true
      })
      getAll(userInfo.user.email)
    }).then(()=>{
      history.push('/home')
    }).catch((error)=>{
      swal('Login Unsuccessful',`Error- ${error.message}`,'error')
      setLoader({
        ...loader,load:!loader.hide
      })
    })

  }

  function handleChange(e){
    e.preventDefault();
    setUserProfile({
    ...user,[e.target.id]:e.target.value
    })
}

  return <div className='container login'>
      <p className='text-center m-2 mt-1 loginlabel'>Login</p>
    <div className='details m-5'>
    <form id='loginform' onSubmit={LoginUser}>
    <Loader hidden={loader.hide}/>
        <div className='p-5'>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email"  value={user.email} onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={user.password} onChange={handleChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Login</button>
        </div>
    </form>

    <div>

    </div>
    </div>

    <div className='m-5'>
      <p className='h3'>Not Registered? <Link to='/register' className='btn btn-secondary'>Register Here</Link></p>
  </div>
  </div>;
}
