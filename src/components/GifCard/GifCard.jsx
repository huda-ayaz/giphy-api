import React, {useState} from "react";
import axios from "axios";

const GifCard = () => {
    return (
        <div>
            <input value={term} onChange={handleInput}/>
        </div>
    );
}

export default GifCard;