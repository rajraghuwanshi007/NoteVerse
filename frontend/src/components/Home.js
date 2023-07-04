import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Note from "./Note.js";
import AddNote from "./AddNote.js";
import IsSec from "./IsSec.js";

const Home = () => {
  const { loading } = useContext(NoteContext);
  return (
    <>
      <AddNote />
      <IsSec />
      <div>
        {!loading && <h1>Your notes</h1>}
        <Note />
      </div>
    </>
  );
};
export default Home;
