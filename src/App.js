import React, {useState} from "react";
import axios from "axios";
import './App.css';
import SearchField from "./components/SearchField/SearchField";

function App() {
  const [gifs, setGifs] = useState([]);

  const componentDidMount = () => {
    fetchTrendingGif();
  }

  async function fetchTrendingGif() {
    try { const gifs = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    setGifs(gifs.data.gifs);
    } catch(error) {
        console.error(error);
    };
  }

  async function fetchSearchGif() {
    try { const distance = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${SearchField.term}&api_key=wL6ffueM0m4qFxcrWZXB115QX2jOOrD2`);
    setGifs(gifs.data.gifs);
    } catch(error) {
        console.error(error);
    };
  }

  return (
    <div>
      <h1>GIF SEARCH</h1>
      <div class="search-bar">
        <SearchField/>
        <button onClick={fetchSearchGif}>SEARCH</button>
      </div>
    </div>
  );
}

export default App;
