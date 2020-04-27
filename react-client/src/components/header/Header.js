import React from 'react'
import Tilt from 'react-tilt'
import logo from '../logo/Logo'
import './header.css'


const Header = (props) => {
  const {display_name, images} = props.user
  //how to access image link in spotifies images array
    // console.log(images)
// console.log(props)
// const {sadClick} = props.sadClick
// console.log(props.tracks)

return (
  <div >
    <div className='ma4 mt0'>
    <p className="f1 white underline"> MOOD LIFTER</p>
      <h1 className='f1 white'>{display_name}</h1>
      <Tilt className="Tilt" br2 shadow-2 options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner container"> <img style={{paddingTop: '5px'}} alt='logo' src={logo}/> </div>
      </Tilt>
    </div>
    <img id="avatar" alt= '' width="200" src="" />
  </div>
  );
}

export default Header