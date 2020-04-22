import React, {useState, useEffect} from 'react'
import './feelings.css'

// const select_songs_for_feeling(props){
//   console.log(props)


const Feeling = (props) => {
  const [music, setMusic] = useState(0)
  // console.log(props)
  // const {sadClick} = props.sadClick
  // console.log(props.tracks)
  
  return (
    <div >
      <div className='white f3'>
          {'Click your Mood!!!'}
      </div>
      <div className='center pa3'>
          <div className='form pa4 br3 shadow-5 ph3'>
            {/* <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-orange'>HAPPY</button> */}
            <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-yellow'>HAPPY</button>
            <button   className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-light-blue'>SAD</button>
            <button className='w-33 grow no-underline f4 br-pill b bw2 ph3 pv2 mb2 dib white bg-red'>ANGRY</button>
          </div>
      </div>
      <p className='f3'>
          {'This App will generate a playlist based on your mood'}
      </p>
    </div>
  );
}

export default Feeling