import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import SearchField from "./components/SearchField/SearchField";
import GifCard from "./components/GifCard/GifCard";

function App() {
  const [gifs, setGifs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  // const handleIsLoaded = () => {
  //   setIsLoaded(true);
  //   if (isLoaded) {
  //     fetchTrendingGif();
  //     console.log("loaded");
  //   }
  // }

  useEffect( () => {
    if (isLoaded)
      console.log("loaded");
      fetchTrendingGif();
    }, [])

  async function fetchTrendingGif() {
    try { const hold = await axios.get("http://api.giphy.com/v1/gifs/trending?api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2");
    console.log("got gifs");
    setGifs(hold.data.data);
    } catch(error) {
        console.error(error);
    };
  }

  async function fetchSearchGif() {
    try { const distance = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${SearchField.term}&api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    setIsLoaded(false);
    console.log("searched");
    setGifs(gifs.data.data);
    } catch(error) {
        console.error(error);
    };
    fetchSearchGif();
  }

  return (
    <div>
      <h1>GIF SEARCH</h1>
      <div className="search-bar">
        <SearchField/>
        <button onClick={fetchSearchGif}>SEARCH</button>
      </div>
      <h2>Trending Gifs:</h2>
      <div className="gif-results">
        {gifs.map(gif => (
        <GifCard gifLink={gif.images.fixed_height.url}></GifCard>
        ))}
      </div>
    </div>
  );
}

export default App;
