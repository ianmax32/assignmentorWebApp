import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom'
import './register.css'
import sha256 from 'crypto-js/sha256';
import swal from '@sweetalert/with-react';
import { Redirect } from 'react-router-dom';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {app} from '../../firebase'
import Loader from '../Services/Loader';

export default function Register() {
    const [user, setUser] = useState({
        first_name:'',
        surname:'',
        email:'',
        password:''
    })

    const navigate = useHistory();

    async function RegisterUser(e){
        e.preventDefault();
        await hashPassword()
        swal({
            text:'Are you sure the details are correct?',
            buttons:{
                cancel:'Close',
                correct:{
                    text:'Correct',
                    value:true
                }
            },
            content:(
                <div>
                    <h1>Your Information</h1>
                    <label>Full Name: {user.first_name+" "+user.surname}</label><br/>
                    <label>Email Address: {user.email}</label><br/>
                    <label>Password: <text-area cols={5}>{user.password}</text-area></label><br/>

                </div>
            )
        }).then((value)=>{
            
            value?
            swal('Well done','You have successfully Registered', 'success').then(()=>{
                <Loader hidden={false}/>
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, user.email,user.password)
                .then((userinfo)=>{
                    const info = userinfo.user;
                }).catch((error)=>{
                    console.log(error.message)
                })
                setUser({
                    first_name:'',
                    surname:'',
                    email:'',
                    password:''
                })
                
                navigate.push('/Login');
            })
            :swal('Edit','Please Edit the incorrect Information','warning')
        }).then(()=>{
            <Loader hidden={true}/>
            console.log(user);
        });


        
        
    }

    function hashPassword(){
        setUser({
            ...user,password:sha256(user.password).toString()
        })
    }

    function UpdateState(e){
        e.preventDefault();
    
        setUser({
            ...user,[e.target.id]:e.target.value
        })

        
    }


  return <div className='container'>
    <p className='text-center m-2 mt-1 loginlabel'>Register</p>
    <div className='details m-5'>
        <form id='register-form' onSubmit={RegisterUser}>
            <div className='p-5'>
            <div class="mb-3">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" class="form-control" id="first_name" value={user.first_name} onChange={UpdateState} aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="surname" class="form-label">Surname</label>
                <input type="text" class="form-control" id="surname" value={user.surname} onChange={UpdateState} aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="text" class="form-control" id="email" value={user.email} onChange={UpdateState} aria-describedby="emailHelp"/>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" value={user.password}  onChange={UpdateState} id="password"/>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary mx-auto flex-wrap">Register</button>
            </div>
        </form>
  </div>

  <div className='m-5'>
      <p className='h3'>Already Registered? <Link to='/login' className='btn btn-secondary'>Login</Link></p>
  </div>
  </div>;
}
