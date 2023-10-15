import React from "react";
import { useState } from "react";
import { supabase } from "./supabase";

export default function SongForm() {
    const [songTitle, setSongTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    return (
        <div className = 'songForm'>
            <form // need to add each song to list of songs
            onSubmit={async(e) => {
                e.preventDefault();
                const result = await supabase.from("Songs").insert({ songTitle : songTitle, artistName : artist, albumTitle : albumTitle, genre : genre, releaseDate : releaseDate });
                console.log(result);
            }}
            > 
                <label htmlFor = "form-song">Song Title: </label>
                <input
                    id = "form-song"
                    type = "text"
                    value = {songTitle}
                    onChange={(e) => {
                        setSongTitle(e.target.value);
                    }}
                    required
                />
                <br />

                <label htmlFor = "form-artist">Artist Name: </label>
                <input
                    id = "form-artist"
                    type = "test"
                    value = {artist}
                    onChange={(e) => {
                        setArtist(e.target.value);
                    }}
                    required
                />
                <br />

                <label htmlFor = "form-album">Album Title: </label>
                <input 
                    id = "form-album"
                    type = "text"
                    value = {albumTitle}
                    onChange={(e) => {
                        setAlbumTitle(e.target.value);
                    }}
                    required
                />
                <br />

                {// Drop down?
                }
                <label htmlFor = "form-genre">Genre: 
                </label> 
                <input
                    id = "form-genre"
                    type = "text"
                    value = {genre}
                    onChange={(e) => {
                        setGenre(e.target.value);
                    }}
                    required
                />
                <br />

                <label htmlFor = "form-release-date">Release Date: 
                </label> 
                <input
                    id = "form-release-date"
                    type = "date"
                    value = {releaseDate}
                    onChange={(e) => {
                        setReleaseDate(e.target.value);
                    }}
                    required
                />
                <br />

                <input type = "submit" value = "Submit" />
            </form>
        </div>
    )
}