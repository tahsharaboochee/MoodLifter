import React from 'react';
import './login.css';

const Login = (props) => {
    const {token} = props
    return (
        <nav style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="f3 link dim white underline pa3 pointer btn btn--loginApp-link">
               {token ? <a href="/logout">{'Logout of Spotify'}</a> : <a href="/login">{'Login to Spotify'}</a>}
            </button>
        </nav>
    );
};

export default Login;
