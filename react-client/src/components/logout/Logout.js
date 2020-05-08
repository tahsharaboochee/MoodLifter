import React, { Component } from 'react';
import './logout.css';

class Logout extends Component {
    constructor(props){
        super(props)
    }
    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }
    render() {

        return (
            <nav >
                <div className="ba bw5" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <img style={{maxWidth: "100%", height: "auto"}} src= {require('../logo/Mood Lifter-logo-white.png')}></img>
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={this.handleLogout.bind(this)}
                        className="f3 link dim white underline pa3 pointer btn btn--loginApp-link"
                    >
                        <a href="/logout">{'Logout of Spotify'}</a>
                    </button>
                </div> */}
            </nav>
        );
    }
}

export default Logout;
