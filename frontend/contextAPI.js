import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = (props) => {
  const state = {
    name: "kartik",
    class: "5b",
  };

  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

const About = () => {
  const a = useContext(NoteContext);
  return <div>This is about {a.name}</div>;
};

// Wrap all the components in app.js around <NoteState>{all the components of the app will come here}</NoteState>