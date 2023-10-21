import './App.css';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

import SongForm from "./songForm";

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
};

export default function App() {

  
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("This is what we derived:" + getTokenFromUrl());
    const spotifyToken = getTokenFromUrl().access_token
    window.location.hash = "";
    console.log("This is our spotify token: ", spotifyToken);

    if(spotifyToken){
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        console.log(user)
      })
      setLoggedIn(true);
    }
  })

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }

  useEffect(() => {
    //fetch function
    async function fetchSongTitle() {
      const { data, error } = await supabase.from("Songs").select("*"); // fetch from table name
      if (data) {
        setSongTitle(data);
      } else {
        console.log(error)
      }
    }

    fetchSongTitle();
  }, []);

    //Use data that was fetched:
    return <div>
      {!loggedIn && <a href="http://localhost:8888" > Login to Spotify! </a>}
      {loggedIn && (
        <>
          <div>Now Playing : (nowPlaying.name)</div>
          <div> <img> src = {nowPlaying.albumArt} style = {{height:150}}</img> </div>
        </>
      )}
      {loggedIn && (
        <button>onClick = {() => getNowPlaying()} Check now Playing</button>
      )} 



      <h1>Song Title</h1>
      <ul>
        {songTitle ? (songTitle.map((song) => {
          return <li key={song.id}>{song.name}</li>;
        }) 
        ) : (
          <p> Loading .. </p>
        )}
      </ul>
      <div>
          <SongForm
          songTitle={setSongTitle}
          artist={setArtist}
          albumTitle={setAlbumTitle}
          genre={setGenre}
          releaseDate={setReleaseDate}
          />
      </div>
    </div>

  // const [songTitle, setSongTitle] = useState('')
  // return (
  //   <div className="App">
  //     <SongForm
  //       songTitle = {songTitle} 


  //     />
  //   </div>
}

