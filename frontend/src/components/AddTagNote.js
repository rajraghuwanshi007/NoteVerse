import React, { useState, useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

export default function AddTagNote(props) {
  const { addTagNote, showAlert, loading } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: `${props.tag}`,
  });

  const handleClick = (e) => {
    e.preventDefault();
    addTagNote(note.title, note.description, note.tag);
    showAlert("Added Successfully", "success");
    setNote({
      title: "",
      description: "",
      tag: `${props.tag}`,
    });
  };
  
  const handleChange = (e) => {
    setNote((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if (loading) return <Spinner />;
  return (
    <div className="container w-50 card border-dark mb-3">
    <form className="form-signin">
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal card-body text-dark">Add a note with tag <strong><i>{props.tag}</i></strong></h1>
      </div>
  
      <div className="form-label-group">
        <input type="text" id="title" name="title" className="form-control" placeholder="title" value={note.title}  onChange={handleChange} required minLength={3} autoFocus />
        <label htmlFor="title">Title</label>
        <div id="titleHelp" className="form-text">
          Minimum 3 characters long
        </div>
      </div>
  
      <div className="form-label-group">
        <textarea type="text" name="description" id="Description" className="form-control" placeholder="Description"  value={note.description}  onChange={handleChange}  required  minLength={5}/>
        <div id="description" className="form-text">
          Minimum 5 characters long
        </div>
      </div>
      <div className="form-label-group">
        <input type="text" name="tag" id="tag" className="form-control" placeholder="tag"  value={note.tag} disabled style={{cursor:"no-drop"}} onChange={handleChange} />
        <label htmlFor="tag">Tag</label>
      </div>
      <div className="text-center"><button disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleClick}>Add</button></div>
    </form>
    </div>
  );
}
