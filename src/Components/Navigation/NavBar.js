import React,{useState, useContext} from 'react';
import {Link} from 'react-router-dom'
import './navstyle.css'
import defaultpic from '../../Images/default.png'
import swal from '@sweetalert/with-react';
import AssignmentsContext from '../Services/AssignmentsContext';

export default function NavBar() {

  const {assignments} = useContext(AssignmentsContext)
  const [profile, setProfile] = useState({
    pic:''
  });

  function updateValue(){

  }

  function changeImage(e){
    e.preventDefault();
    swal({
      text:'Profile Image',
      buttons:{
        cancel:'Close',
        update:{
          text:'Update',
          value:true
        }
      },
      content:(
        <div>
          <img src={profile.pic} width={200} height={200} alt='image' className='profile'/>
          <label>Selected Picture: </label>
          <input type={'file'} value={profile.pic} onChange={updateValue}/>
        </div>
      )
    })
  }

  return <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">AssignMentor</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                  <Link to='/Home' className="nav-link active" aria-current="page" href="#">Home</Link>
                  <Link to='/Discussions' className="nav-link" href="#">Discussions</Link>
                  <Link to='/Resources' className="nav-link" href="#">Resources</Link>
                  
              </div>

              <div className='navbar-options navbar-nav'>
                <p className='nav-link '>{assignments.length} Assignments Uploaded</p>
                <img src={defaultpic} alt='profile' className='profileimage m-2' onClick={changeImage}></img>
              </div>
            </div>
        </div>
    </nav>
  </div>;
}
