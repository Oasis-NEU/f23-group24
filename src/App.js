import './App.css';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

import SongForm from "./songForm";

export default function App() {

  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

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
// >>>>>>> 3eb41fbaf1d02c8633129a2090fc5f0de1b65a7b

  // const [songTitle, setSongTitle] = useState('')
  // return (
  //   <div className="App">
  //     <SongForm
  //       songTitle = {songTitle} 


  //     />
  //   </div>
}

