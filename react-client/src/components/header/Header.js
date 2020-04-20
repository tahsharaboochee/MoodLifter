import React from 'react'
import './header.css'
import { authEndpoint, clientId, redirectUri, scopes } from "../config";

const Header = (props) => {
  // let {spotifyPlayerReady} = props
  return (
    <nav style={{display: 'flex', justifyContent: 'center'}}>
      <button  className="f3 link dim white underline pa3 pointer btn btn--loginApp-link" >
        <a
          // href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          //   "%20"
          // )}&response_type=token&show_dialog=true`}
          href='/login'
        >
          {'Login to Spotify'}
        </a>
      </button>
    </nav>
  );
}

export default Header