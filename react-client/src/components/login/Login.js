import React from 'react';
import './login.css';
import '../logo/Mood Lifter-logo-white.png'

const Login = (props) => {
    const {token} = props
    return (
        <nav className='container'>
            <div className='item' >
            {/* use require to load an img https://stackoverflow.com/questions/34582405/react-wont-load-local-images */}
                <img style={{width: 200, height: 200}} src= {require('../logo/Mood Lifter-logo-white.png')}></img>
            </div>
            <div className='item'>
            <button className="f3 link dim white underline pa3 pointer btn btn--loginApp-link">
               {token ? <a href="/logout">{'Logout of Spotify'}</a> : <a href="/login">{'Login to Spotify'}</a>}
            </button>
            </div>
        </nav>
    );
};

export default Login;
