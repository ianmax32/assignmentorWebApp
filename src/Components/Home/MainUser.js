import axios from 'axios';
import React,{ useEffect, useState , useContext} from 'react';
import Assignment from '../Assignment/Assignment';
import NavBar from '../Navigation/NavBar';
import Loader from '../Services/Loader';
import {BsUpload} from 'react-icons/bs'
import swal from '@sweetalert/with-react';
import * as Swal from 'sweetalert';
import pdf from '../../Images/pdf.png'
import word from '../../Images/word.png'
import './mainuser.css'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import UserContext from '../Services/UserContext';
import AssignmentsContext from '../Services/AssignmentsContext';


import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function MainUser() {

  const {assignments,assignment, UploadAssignment, getAll}= useContext(AssignmentsContext);
  const {user,LoggedIn,successLogin,isLoggedIn} = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  var person ={}
  
 

  useEffect(()=>{
    
    //const auth = getAuth()
    onAuthStateChanged(auth,(pers)=>{

    })
    
    const logger = window.sessionStorage.getItem('person')
    person = JSON.parse(window.sessionStorage.getItem('person'))
    console.log(logger)
    

    
    
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  })
       
  

  function UploadFile(){
    
    swal({
      text:'Please select the file you want to upload',
      buttons:{
        cancel:'Close',
        Upload:{
          text:'Done',
          value:'true'
        }
      },
      content:(
        <div>
          <form name='inputform'>
            <label className='m-2'>File name: </label>
            <input type={'file'} name='name' value={assignment} className='m-2' accept=".doc,.docx,application/msword,application/pdf"/><br/>
            <label>How do you want to be helped on this assignment?</label>
            <textarea className='' rows={4} cols={50} ></textarea>
            
        </form>
        </div>
      )
    }).then((value)=>{
      var file = document.forms['inputform']["name"].files[0];
      console.log(file)
      UploadAssignment(person.email,file)
      //value==='true'?FileUploaded():swal("File not uploaded")
    })
  }

  function showInfo(){
    alert('Info')
  }

  return <div className='container'>
      <NavBar />
      <h1 className='text-center'>Welcome {person.email}</h1>
      <header className='text-center h1'>Uploaded Assignments</header>
      <div className='main text-center flex-wrap d-flex'>
        {assignments.map((ment)=>(
          <Assignment type={pdf} name={ment.name} date={ment.lastModified} key={ment.uid}/>
        ))}
        
        <i className='float'>
        <BsUpload size={40} onClick={UploadFile} className='mt-1'/>
          <p className=''>Upload file</p>
        </i>
        
        <Loader hidden={true}/>
      </div>
  </div>;
}
