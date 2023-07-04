import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { Link } from "react-router-dom";


const Home = () => {
    const { loading } = useContext(NoteContext);
    return (
      <>
        <div className="mt-5">
          {!loading && <h3 >Click to categorise your Notes by tags <span style={{margin:"5%"}}><Link className=" btn btn-outline-primary" to="/section">Click here</Link></span></h3>}
        </div>
      </>
    );
  };
  export default Home;
  