import React, {useState} from "react";
import axios from "axios";

function GifCard({gifLink}) {
    return (
        <div>
            <img src = {gifLink}></img>
        </div>
    );
}

export default GifCard;