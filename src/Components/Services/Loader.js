import React,{useState} from 'react';
import './loader.css';

export default function Loader(props) {

    const [spinner, showSpinner] = useState(false);

  return (
    <div className='loaderContainer'>
        <div className='loader' hidden={props.hidden}></div>
    </div>
  )
}
