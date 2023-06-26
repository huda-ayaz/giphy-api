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
  const [stickerOnly, setStickerOnly] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect( () => {
    if (isLoaded)
      fetchTrendingGif();
    }, [])

  async function fetchTrendingGif() {
    try { const gifs = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    console.log("got gifs");
    setResults(`Trending gifs:`)
    setGifs(gifs.data.data);
    } catch(error) {
        console.error(error);
    };
  }

  async function fetchSearchGif() {
    try { const gifs = await axios.get(`http://api.giphy.com/v1/${stickerOnly?"stickers":"gifs"}/search?q=${term}&api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    console.log("searched" + term);
    setIsLoaded(false);
    setResults(`Showing results for ${stickerOnly?"stickers":"gifs"} related to: ` + term);
    setGifs(gifs.data.data);
    } catch(error) {
        console.error(error);
    };
  }

  const handleInput = () => {
    setSubmitted(true);
    fetchSearchGif();
  }

  const handleStickerFilter = () => {
    if (!stickerOnly) {
      setStickerOnly(true);
      document.getElementById("btn-sticker").classList.add("selected");
    } else {
      setStickerOnly(false);
      document.getElementById("btn-sticker").classList.remove("selected");
    }
  }

  return (
    <div>
      <h1>GIF SEARCH</h1>
      <div className="search-bar">
        <SearchField setSearchTerm={setSearchTerm}/>
        <button onClick={handleInput}>SEARCH</button>
        <button id="btn-sticker" onClick={handleStickerFilter}>STICKERS ONLY</button>
      </div>
      <p>Click SEARCH again after changing the sticker filter for your searches!</p>
      <div>
      </div>
      <h2>{results}</h2>
      <div className="gif-results">
        {gifs.map(gif => (
          (!stickerOnly || gif.is_sticker===1)
          ? (<GifCard gifLink={gif.images.fixed_height.url}></GifCard>)
          : null
        ))}
      </div>
    </div>
  );
}

export default App;
