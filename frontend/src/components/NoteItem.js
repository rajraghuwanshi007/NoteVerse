import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote, loading } = context;
  const { note, updateNote } = props;
  if (loading) return <Spinner />;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          {note.tag && <p className="card-text">{note.tag}</p>}
        </div>
      </div>
    </div>
  );
}
