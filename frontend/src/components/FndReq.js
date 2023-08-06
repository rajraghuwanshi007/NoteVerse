import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ReqComp from "./ReqComp";
import SentRequest from "./SentRequest";
import SearchFrnd from "./SearchFrnd";

const FndReq = () => {
    const { getAllRec,getAllSent, recReq, loading } = useContext(NoteContext);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
        await getAllSent();
        await getAllRec();
        const b = localStorage.getItem("token");
        if (b != null) {
        } else {
            navigate("/login");
        }
        })();
        // eslint-disable-next-line
    }, []);
    if (loading) return <Spinner />;
    
    return (
        <>
            <h2>ADD FRIENDS</h2>
            <SearchFrnd />
            <SentRequest/>            
            <h2 className="mt-5">FRIEND REQUESTS</h2>
            <div className="container">
                {recReq.length === 0 && "No FriendRequest"}
            </div>
            {   recReq.length!==0 &&
                <p>{recReq.length } friend requests</p>
            }
            <ol className="list-group ">
                {recReq.map((req)=>(
                   <ReqComp key={req.email} req={req}/>
                ))}
            </ol>
        </>
    );
};

export default FndReq;