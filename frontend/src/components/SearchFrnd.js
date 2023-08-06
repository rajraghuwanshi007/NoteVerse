import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const SearchFrnd= ()=>{
    const { makeReq } = useContext(NoteContext);
    const [txt, setTxt]=useState(""); 
    const handleChange= (e)=>{
        setTxt(e.target.value)
    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" name="searchFriend" placeholder="Username" value={txt} onChange={handleChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={(e)=>{
                    makeReq(txt)
                    e.preventDefault();
                }}>Add</button>
            </div>
        </>
    )
}

export default SearchFrnd