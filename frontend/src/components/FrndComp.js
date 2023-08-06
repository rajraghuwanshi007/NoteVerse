import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Share from "./Share.js";

const ReqComp= (props)=>{
    const {  delFrnd } = useContext(NoteContext);
    const { email,note, shareNote } = props;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{props.req.name}</div>
                    {props.req.email}
                </div>
                <button className="btn btn-primary" onClick={()=>{
                    shareNote(note,email)
                }}>Share Notes</button>
                <button className="btn btn-danger ms-3" onClick={()=>{
                    delFrnd(props.req.email)
                }}>Remove Friend</button>
            </li>
        </>
    );
};

export default ReqComp;
