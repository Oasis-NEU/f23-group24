import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Cards, Card } from 'react-bootstrap';
import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useState, useEffect, useMemo } from "react";
// Routers
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const Search = () => {  

  // Navigate to review page
  const navigate = useNavigate();
  const routeReviewForm = (album) => {
    let path = `/reviewForm/${album}`;
    navigate(path);
  }

  const location = useLocation();
  console.log(location);
  /*const accessToken = useMemo(() => location?.search.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {}).code, [location]); */

  const getTokenFromUrl = (windowLocation) => {
    return windowLocation.search.substring(1).split('&').reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {})
  }

    //spotify login
    const [spotifyToken, setSpotifyToken] = useState("");
    const [nowPlaying, setNowPlaying] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      console.log("This is what we derived:" + getTokenFromUrl(location));
      const spotifyToken = localStorage.getItem("spotifyToken") ?? getTokenFromUrl(location).code
     // window.location.hash = "";
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
    }, [location])
  
    // const getNowPlaying = () => {
    //   spotifyApi.getMyCurrentPlaybackState().then((response) => {
    //     console.log(response);
    //     setNowPlaying({
    //       name: response.item.name,
    //       albumArt: response.item.album.images[0].url
    //     })
    //   })
    // }

    const spotifyApi = new SpotifyWebApi();
    // const CLIENT_ID = "29eac716ed5d4813a7a902b307f735bb";
    // const CLIENT_SECRET = "a1df483d11ac47019c68d22b479f8385";


    const [albums, setAlbums] = useState([]);
    const[searchInput, setSearchInput] = useState("");
    async function search() {
    console.log("Search for " + searchInput);

    //Get request using search to get Artist ID
    console.log('Our Token' + spotifyToken)
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization'  :'Bearer ' + spotifyToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {console.log(data)
        return data.artists.items[0].id})

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




  return <div>

  <Container>
    <InputGroup className = "mb-3" size = "lg">
      <FormControl 
        placeholder = 'Search For Artist'
        type = "input"
        onKeyPress={event => {
          if (event.key == 'Enter'){
            search();
          }
        }}
        onChange = {event => setSearchInput(event.target.value) }
      />
      <Button onClick={search}>
        Search
      </Button>
    </InputGroup>
  </Container>
  <Container>
    <Row className='no-gutters row row-cols-4'>
      {albums.map( (album, i) => {
        console.log(album);
        return(
          <Card className = 'text-white bg-info'>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              {/* <Button onClick = {console.log('Add form here')}>
                Rate Me
              </Button> */}
              <Button onClick={event => {routeReviewForm(album)}}>Rate</Button>
            </Card.Body>
          </Card>
        )
      })}
    </Row>
  </Container>


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

  </div>

    //NOT STAYING LOGGED IN, WHEN I LOG IN it redirects to :3000/# and when i go back to search login to spotify! pops up again
    // which means that you are not loggedIn as seen in line 124 
}

export default Search;