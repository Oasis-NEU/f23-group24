import SpotifyWebApi from 'spotify-web-api-js';
import { useState, useEffect } from "react";
import logo from './MusicBoxLogo.png';
import { Image } from 'react-native';



const SignIn = () => {

    // const getTokenFromUrl = () => {
    //     return location.hash.substring(1).split('&').reduce((initial, item) => {
    //       let parts = item.split("=");
    //       console.log(parts);
    //       initial[parts[0]] = decodeURIComponent(parts[1]);
    //       return initial;
    //     }, {});
    //   };
    
    const spotifyApi = new SpotifyWebApi();
    // const [spotifyToken, setSpotifyToken] = useState("");
    const [nowPlaying, setNowPlaying] = useState({});
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("spotifyToken"));

    const token = localStorage.getItem("spotifyToken");
    spotifyApi.setAccessToken(token);
    // useEffect(() => {
    //     console.log("This is what we derived:" + getTokenFromUrl());
    //     const spotifyToken = getTokenFromUrl().code
    //     window.location.hash = "";
    //     console.log("This is our spotify token: ", spotifyToken);

    //     if(spotifyToken){
    //     setSpotifyToken(spotifyToken)
    //     spotifyApi.setAccessToken(spotifyToken)
    //     spotifyApi.getMe().then((user) => {
    //         console.log(user)
    //     })
    //     setLoggedIn(true);
    //     }
    // })


      const getNowPlaying = () => {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
          console.log(response);
          setNowPlaying({
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          })
        })
      }

      const signOutNow = () => {
        localStorage.removeItem("spotifyToken");
        window.location.reload();
      }


    return <div>
    {/* <div style="text-align: center;"> */}
    <center><img src = {logo} width = "400" height ="350"/>
    {/* </div> */}
    {!loggedIn && <a href="http://localhost:8888" > Login to Spotify! </a>}
    {loggedIn && (
    <>
        <div> Now Playing : {nowPlaying.name} </div>
        <div> <img src = {nowPlaying.albumArt} style = {{height:150}}/> </div>
    </>
    )}
    {loggedIn && (
    <button onClick = {() => getNowPlaying()}>Check now Playing</button>
    )} 
    {loggedIn && (
    <button onClick = {() => signOutNow() }>Sign out</button>  
    )} 
  </center>
  
    </div>


}

export default SignIn;