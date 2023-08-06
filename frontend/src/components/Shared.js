import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import SharedNoteItem from "./SharedNoteItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Shared =()=>{
    const { sharedNotes, getAllSharedNotes, editNote, loading } = useContext(NoteContext);
    // Simply running getAllNotes() will result into infinite loop. See here : https://www.datainfinities.com/20/too-many-re-renders-react-limits-the-number-of-renders-to-prevent-an-infinite-loop
    const navigate = useNavigate();
    useEffect(() => {
      (async () => {
        await getAllSharedNotes();
        const b = localStorage.getItem("token");
        if (b != null) {
        } else {
          navigate("/login");
        }
      })();
      // eslint-disable-next-line
    }, []);
  if (loading) return <Spinner />;
    return(
        <>
            <div className="row my-3">
                <div className="container">
                {sharedNotes.length === 0 && "No Notes to display"}
                </div>
                {sharedNotes.map((note) => (
                <SharedNoteItem key={note._id}  note={note} />
                ))}
            </div>
        </>
    )
}

export default Shared;