import React from 'react';
import Tilt from 'react-tilt';
import logo from '../logo/Logo';
import './header.css';

const Header = (props) => {
    const { display_name, images } = props.user;
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="ma4 mt0">
                {/* <p className="f1 white underline"> MOOD LIFTER</p> */}
                <h1 className="f3 pa3 ma3 white"> Welcome {display_name} </h1>
            </div>
        </div>
    );
};

export default Header;
