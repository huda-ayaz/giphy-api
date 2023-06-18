import React, {useState} from "react";
import "./SearchField.css";
import axios from "axios";

const SearchField = () => {
    const [term, setTerm] = useState("");

    const handleInput = (event) => {
        setTerm(event.target.value);
        console.log(term);
    }

    return (
        <div class="search-bar">
            <input value={term} onChange={handleInput}/>
            <button>SEARCH</button>
        </div>
    );
}

export default SearchField;