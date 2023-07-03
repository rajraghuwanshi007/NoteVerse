import React, { useState, useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

export default function AddNote() {
  const { addNote, showAlert, loading } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("Added Successfully", "success");
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const handleChange = (e) => {
    setNote((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if (loading) return <Spinner />;
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
            minLength={3}
          />
          <div id="titleHelp" className="form-text">
            Minimum 3 characters long
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={note.description}
            onChange={handleChange}
            required
            minLength={5}
          ></textarea>
          <div id="descriptionHelp" className="form-text">
            Minimum 5 characters long
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            name="tag"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={note.title.length < 3 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
