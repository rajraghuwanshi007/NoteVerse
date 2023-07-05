import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { Link } from "react-router-dom";


const Home = () => {
    const { loading } = useContext(NoteContext);
    return (
      <>
        <div className="mt-5">
          {!loading &&   <div className="card border-dark mb-3" ><div className="card-body text-dark"><h3 >Click to categorise your Notes by tags <span ><Link className=" btn btn-outline-primary" style={{float: "right"  }} to="/section">Click here</Link></span></h3></div></div>}
        </div>
      </>
    );
  };
  export default Home;
  

