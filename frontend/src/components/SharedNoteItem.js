import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteSharedNote, loading } = context;
  const { note} = props;
  if (loading) return <Spinner />;
  return (
    <>
     <div className="col-md-3">
      <div className="card mb-3 my-3" style={{"maxWidth": "540px"}}>
      <div className="row g-0">
        <div className=" col-md-4">
          <i>From: {note.from}</i>
          <i
              className="fa-solid fa-trash mx-2 mt-5"
              onClick={() => {
                deleteSharedNote(note._id);
              }}
            ></i>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Title:  {note.title}</h5>
            <p className="card-text">Description: {note.description}</p>
            <p className="card-text"><small class="text-body-secondary">Tag: {note.tag}</small></p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
