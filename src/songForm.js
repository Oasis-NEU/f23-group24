import React from "react";

export default function SongForm({
    songTitle,
    artist,
    albumTitle,
    exists, // variable for if song already exists

}) {
    return (
        <div className = 'songForm'>
            <form // need to add each song to list of songs
            > 
                <label htmlFor = "form-song">Song Title: </label>
                <input
                    id = "form-song"
                    type = "text"
                    value = {songTitle}
                    required
                />
                <br />

                <label htmlFor = "form-artist">Artist Name: </label>
                <input
                    id = "form-artist"
                    type = "test"
                    value = {artist}
                    required
                />
                <br />

                <label htmlFor = "form-album">Album Title: </label>
                <input 
                    id = "form-album"
                    type = "text"
                    value = {albumTitle}
                    required
                />
                <br />

                <input type = "submit" value = "Submitted!" />
            </form>
        </div>
    )
}