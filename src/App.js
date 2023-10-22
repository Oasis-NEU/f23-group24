import './App.css';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./style.css";

import SongForm from "./songForm";
// import HomePage from "./homepage";


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
        //setSongTitle(data);
      } else {
        console.log(error)
      }
    }

    fetchSongTitle();
  }, []);

    //Use data that was fetched:
// <<<<<<< HEAD
    // return <div>
    //   <h1>Song Title</h1>
    //   <ul>
    //     {songTitle ? (songTitle.map((song) => {
    //       return <li key={song.id}>{song.songTitle}, 
    //       {song.artistName}, {song.albumTitle},{song.genre}, 
    //       {song.releaseDate}</li>;

    //     }) 
    //     ) : (
    //       <p> Loading .. </p>
    //     )}
    //   </ul>
    // </div>
// =======
    return <div>
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



      <h1>Song Title</h1>
      <nav>
            <div id="nav-left">
                <img
                    alt="Star Logo"
            src="https://static.vecteezy.com/system/resources/thumbnails/001/189/165/small/star.png"

                width="80px"/>
                <ul id="menu-list">
                    <li>New Review</li>
                    <a id="userProfile.html" href="login.html">Profile</a>
                    <a id="login.html" href="http://localhost:8888">Log In</a>
                    </ul>
            </div>


            <div id="nav-right">
                <input placeholder="Search for a song..."/>
            </div>

        </nav>
        <section id="banner">Global Reviews</section>

        <header>
            <section id="movie-cards">
                <div class="card">
                    <img
                        class="card-img"
                        alt="Lover Album"
                src="https://upload.wikimedia.org/wikipedia/en/c/cd/Taylor_Swift_-_Lover.png"/>
                <div class="card-content">
                    <h3 class="title">Cruel Summer: Taylor Swift</h3>
                    <a class="link" href="https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=99418b387fff4efc">LISTEN HERE</a>
                    </div>
                </div>
    
                <div class="card">
                        <img
                        class="card-img"
                        alt="FATD album"
                        src="https://static.stereogum.com/uploads/2023/08/For-All-The-Dogs-1692825000-1000x997.jpeg"/>
                        <div class="card-content">
                        <h3 class="title">IDGAF - Drake ft. Yeat</h3>
                        <a class="link" href="https://open.spotify.com/track/2YSzYUF3jWqb9YP9VXmpjE?si=8a859c9588ec44d0">LISTEN HERE</a>
                </div>
            </div>
    
                <div class="card">
                    <img
                    class="card-img"
                    alt="Bad Bunny"
                    src="https://s.abcnews.com/images/GMA/bad-bunny-3-ht-thg-231013_1697210407180_hpEmbed_1x1_992.jpg"/>
                    <div class="card-content">
                    <h3 class="title">MONACO - Bad Bunny</h3>
                    <a class="link" href="https://open.spotify.com/track/4MjDJD8cW7iVeWInc2Bdyj?si=f8411939d556406f">LISTEN HERE</a>
                </div>
            </div>
          </section>

        </header>
        
        <section id="banner">Your Friends</section>
        <section id="movie-cards">
            <div class="card">
                <img
                    class="card-img"
                    alt="Fred Again"
            src="https://www.fredagain.com/assets/img/albumArt.png"/>
            <div class="card-content">
                <h3 class="title">Deliliah (Pull me out of this) - Fred again...</h3>
                <div class="subtitle"> Love this song!!</div>
            
                <a class="link" href="to-infinity">LISTEN HERE</a>
                </div>
            </div>

            <div class="card">
                    <img
                    class="card-img"
                    alt="the 1975"
                    src="https://upload.wikimedia.org/wikipedia/en/0/03/The_1975_%28album%29_by_The_1975.png"/>
                    <div class="card-content">
                    <h3 class="title">Robbers - The 1975</h3>
                    <div class="subtitle">Classic all time favorite. Always on loop.</div>
                    <a class="link" href="to-infinity">LISTEN HERE</a>
            </div>
            </div>

            <div class="card">
                <img
                class="card-img"
                alt="Faye Webster"
                src="https://media.pitchfork.com/photos/5cc0cb6c71b196b2a447fe9a/1:1/w_800,h_800,c_limit/FayeWebster_AtlantaMillionairesClub.jpg"/>
                <div class="card-content">
                <h3 class="title">Kingston - Faye Webster</h3>
                <div class="subtitle">New song I just found! Need to put you guys onto this ASAP!</div>
                <a class="link" href="to-infinity">LISTEN HERE</a>
        </div>

            </div>
        </section>
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

