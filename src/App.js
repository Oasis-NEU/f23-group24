import './App.css';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./style.css";
import "./pages/search"
import "./pages/home"
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Navbar from './components/index';
import { useLocation } from 'react-router-dom';

import SongForm from "./songForm";
// import HomePage from "./homepage";

//spotify search imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Cards, Card } from 'react-bootstrap';

//spotify login
import SpotifyWebApi from 'spotify-web-api-js';
import Search from './pages/search';
import Home from './pages/home';
import SignIn from './pages/signin';
const spotifyApi = new SpotifyWebApi();

//spotify search
// const CLIENT_ID = "29eac716ed5d4813a7a902b307f735bb";
// const CLIENT_SECRET = "a1df483d11ac47019c68d22b479f8385";

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

  const [albums, setAlbums] = useState([]);
  const[searchInput, setSearchInput] = useState("");
  async function search() {
    console.log("Search for " + searchInput);

    //Get request using search to get Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization'  :'Bearer ' + spotifyToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})

    console.log('Artist ID is ' + artistID)
    //Get request with Artist ID grab all albums
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/'+artistID+'/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      })
    //Display albums
  }
  console.log(albums);

  //spotify login
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
      localStorage.setItem("spotifyToken", spotifyToken);
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
        //setSongTitle(data);
      } else {
        console.log(error)
      }
    }

    fetchSongTitle();
  }, []);

  

    return <div>
      {/* {!loggedIn && <a href="http://localhost:8888" > Login to Spotify! </a>}
      {loggedIn && (
        <>
          <div> Now Playing : {nowPlaying.name} </div>
          <div> <img src = {nowPlaying.albumArt} style = {{height:150}}/> </div>
        </>
      )}
      {loggedIn && (
        <button onClick = {() => getNowPlaying()}>Check now Playing</button>
      )}  */}

      {/* <h1>Song Title</h1>
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
      </div> */}


        <Router>
        <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/home' element={<Home />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Routes>
        </Router>
    </div>
// >>>>>>> 3eb41fbaf1d02c8633129a2090fc5f0de1b65a7b

  // const [songTitle, setSongTitle] = useState('')
  // return (
  //   <div className="App">
  //     <SongForm
  //       songTitle = {songTitle} 


  //     />
  //   </div>
}

