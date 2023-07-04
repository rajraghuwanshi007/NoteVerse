import React from "react";
import {  useParams } from "react-router-dom";
import TagNotes from "./TagNotes.js"
import AddTagNote from "./AddTagNote.js";


const TagFetch = () => {
    const param= useParams();
    return (
      <>  
          <AddTagNote tag={param["tag"]} />
          {<TagNotes tag={param["tag"]} />}
      </>
    );
  };
  export default TagFetch;
  