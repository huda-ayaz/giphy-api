import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import SearchField from "./components/SearchField/SearchField";
import GifCard from "./components/GifCard/GifCard";

function App() {
  const [gifs, setGifs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [term, setSearchTerm] = useState("");
  const [results, setResults] = useState("");

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
    try { const gifs = await axios.get("http://api.giphy.com/v1/gifs/trending?api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2");
    console.log("got gifs");
    setResults("Trending gifs:")
    setGifs(gifs.data.data);
    } catch(error) {
        console.error(error);
    };
  }

  async function fetchSearchGif() {
    try { const gifs = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    console.log("searched" + term);
    setIsLoaded(false);
    setResults("Showing results for gifs related to: " + term);
    setGifs(gifs.data.data);
    } catch(error) {
        console.error(error);
    };
  }

  const handleInput = () => {
    fetchSearchGif();
  }

  return (
    <div>
      <h1>GIF SEARCH</h1>
      <div className="search-bar">
        <SearchField setSearchTerm={setSearchTerm}/>
        <button onClick={handleInput}>SEARCH</button>
      </div>
      <h2>{results}</h2>
      <div className="gif-results">
        {gifs.map(gif => (
        <GifCard gifLink={gif.images.fixed_height.url}></GifCard>
        ))}
      </div>
    </div>
  );
}

export default App;
