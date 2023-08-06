import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const ReqComp= (props)=>{
    const { accReq, delReq } = useContext(NoteContext);
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{props.req.name}</div>
                    {props.req.email}
                </div>
                <button className="btn btn-primary" onClick={()=>{
                    accReq(props.req)
                }}>Accept</button>
                <button className="btn btn-danger ms-3" onClick={()=>{
                    delReq(props.req.email)
                }}>Delete</button>
            </li>
        </>
    );
};

export default ReqComp;
