import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";



const SentRequest= ()=>{
    const { sentReq,delSentReq } = useContext(NoteContext);

    return(
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Sent requests</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        {sentReq.length === 0 && <p className="mx-auto my-2 p-2">When you send someone a friend request, it will appear here.</p>}
                    {sentReq.map((req)=>{
                        return (
                            <div key={req.email} className="modal-body">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold"><i style={{fontWeight: "normal"}}>Name: </i> {req.name}</div>
                                        <i style={{fontWeight: "normal"}}>Email: </i>{req.email}
                                        <button className="btn btn-secondary ms-5" data-bs-dismiss="modal" onClick={(e)=>{
                                            delSentReq(req.email)
                                            e.preventDefault();
                                        }}>Withdraw</button>
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SentRequest;