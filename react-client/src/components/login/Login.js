import React from 'react';
import './login.css';
import '../logo/logo-white.png';
import '../logo/Mood Lifter-white.png';
import PropTypes from 'prop-types'

const Login = (props) => {
    const { token } = props;
    return (
        <nav data-test='loginComponent' style={{ display: 'flex', flexWrap: 'wrap' }} className="container">
            <div
                className="item"
                style={{ display: 'flex', justifyContent: 'flex-start', width: '48%', height: '100px' }}
            >
                <p className="f3 white pa3 ma3">MoodLifter</p>
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'flex-end', width: '48%', height: '100px' }}
                className="item"
            >
                <button className="f3 white pa3 ma3 pointer btn btn--loginApp-link">
                    <a className="login white" href="/login">
                        {'Sign In'}
                    </a>
                </button>
            </div>
        </nav>
    );
};

Login.propTypes = {
    token:PropTypes.string
}
export default Login;
