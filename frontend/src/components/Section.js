import React, { useContext, useEffect} from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import SectionComp from "./SectionComp";



const Section=()=>{
  const { getAllSections, loading, sections } = useContext(NoteContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await getAllSections();
      const b = localStorage.getItem("token");
      if (b != null) {
      } else {
        navigate("/login");
      }
    })();
    // eslint-disable-next-line
  }, []);
  if (loading) return <Spinner />;
    return (
        <>
        <div className="row my-3">
            <div className="container">
            {sections.length === 0 && "No Notes to display"}
            </div>
            {sections.map((section) => (
                <SectionComp key={section} section={section} />
            ))}
        </div>
        </>
    )
}
export default Section;