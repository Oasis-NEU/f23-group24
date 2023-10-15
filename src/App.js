import './App.css';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

import SongForm from "./songForm";

export default function App() {

  const [songTitle, setSongTitle] = useState([]);

  useEffect(() => {
    //fetch function
    async function fetchSongTitle() {
      const { data, error } = await supabase.from("Groceries").select("*"); // fetch from table name
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
      <h1>Song Title</h1>
      <ul>
        {songTitle ? (songTitle.map((grocery) => {
          return <li key={grocery.id}>{grocery.name}</li>;
        }) 
        ) : (
          <p> Loading .. </p>
        )}
      </ul>
    </div>

  // const [songTitle, setSongTitle] = useState('')
  // return (
  //   <div className="App">
  //     <SongForm
  //       songTitle = {songTitle} 


  //     />
  //   </div>
}

