import React from 'react'
import logo from './mood-lifter-logo.png'
import './logo.css' 


const Logo = () => {
  return (
    <div className='ma4 mt0'>
  
      <p className="f1 white underline"> MOOD LIFTER</p>
      <div className="Tilt container"> <img style={{paddingTop: '5px'}} alt='logo' src={logo}/> 
      </div>
      
    </div>
  );
}

export default Logo