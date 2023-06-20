import React, {useState} from "react";
import "./SearchField.css";

const SearchField = () => {
    const [term, setTerm] = useState("");

    const handleInput = (event) => {
        setTerm(event.target.value);
        console.log(term);
    }

    return (
        <div className="search-bar">
            <input value={term} onChange={handleInput}/>
        </div>
    );
}

export default SearchField;