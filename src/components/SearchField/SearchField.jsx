import React, {useState} from "react";
import "./SearchField.css";

const SearchField = ({setSearchTerm, submitted}) => {
    const [input, setInput] = useState("");

    const handleInput = (event) => {
        setInput(event.target.value);
        setSearchTerm(event.target.value);
        console.log(input);
    }

    return (
        <div className="search-bar">
            <input onChange={handleInput}/>
        </div>
    );
}

export default SearchField;