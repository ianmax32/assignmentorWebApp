import React, { useState } from 'react';
import pdf from '../../Images/pdf.png'
import Modal from '../Services/Modal';
import './assignment.css'
import {BsThreeDotsVertical} from 'react-icons/bs'

const Assignment = (props)=>{
  


    return (<div className='assignment'>
        <div className='card m-3 img flex-wrap d-flex card_info' >
            
            <img src={props.type} className='card-img-top image' />
            <div className='info'>
                <div className='card-body text-center bg-white font-black metadata'>
                    <p className='card-text'>{props.name}</p>
                    <p className='card-text'>{props.date}</p>
                    
                </div>
                <BsThreeDotsVertical size={50} className='options mt-3'/>
            </div>
        </div>
        
    </div>
    );

}

export default Assignment;
