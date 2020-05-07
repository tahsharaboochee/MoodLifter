import React from 'react';
import './login.css';
import '../logo/logo-white.png'
import '../logo/Mood Lifter-white.png'

const Login = (props) => {
    const {token} = props
    return (
        <nav style={{display: 'flex', flexWrap: 'wrap', }} className='container'>
            <div className='item' style={{ display: 'flex', justifyContent: 'flex-start',  width: '48%', height: '100px'}}>
            {/* use require to load an img https://stackoverflow.com/questions/34582405/react-wont-load-local-images */}
                <img className='' style={{width: 200, height: 200}} src= {require('../logo/logo-white.png')}></img>
                <img className='' style={{width: 200, height: 200}} src= {require('../logo/Mood Lifter-white.png')}></img>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end',  width: '48%', height: '100px'}} className='item'>
            <button className="f3 link dim white underline pa4 ma5 pointer btn btn--loginApp-link">
                <a href="/login">{'Login to Spotify'}</a>
            </button>
            </div>
        </nav>
    );
};

export default Login;
