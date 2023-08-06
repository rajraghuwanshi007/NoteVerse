import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import FrndComp from "./FrndComp";

const Friends = () => {
    const { getAllFrnd, friend,addSharedNote, loading } = useContext(NoteContext);
    const navigate = useNavigate();
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
      });
      const [mail,setMail]=useState("");
      
      const ref = useRef(null);
      const closeRef = useRef(null);
    useEffect(() => {
        (async () => {
        await getAllFrnd();
        const b = localStorage.getItem("token");
        if (b != null) {
        } else {
            navigate("/login");
        }
        })();
        // eslint-disable-next-line
    }, []);
    if (loading) return <Spinner />;
    
    
      const updateNote = (currentNote,email) => {
        ref.current.click();
        setNote(currentNote);
        setMail(email);
      };
    
      const handleChange = (e) => {
        setNote((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };
    
      const handleClick = () => {
        console.log("shared");
        const to=mail;
        addSharedNote(note, to)
        setNote({
            title: "",
            description: "",
            tag: "",
          });
        closeRef.current.click();
      };
      if (loading) return <Spinner />;
      return (
        <>
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch demo modal
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Note
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={closeRef}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
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
                      Minimum 3 characters long
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
                </form>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                    disabled={note.title.length < 3 || note.description.length < 5}
                  >
                    Share fr
                  </button>
                </div>
              </div>
            </div>
          </div>

            <h2>ALL FRIENDS</h2>
            {   friend.length!==0 &&
                <p>{friend.length } friends</p>
            }
            <div className="container mt-5 mx-auto">
                {friend.length === 0 && "Once you add friends, they will shown here."}
            </div>
            <ol className="list-group ">
                {friend.map((req)=>(
                   <FrndComp key={req.email} note={note} email={req.email} shareNote={updateNote} req={req}/>
                ))}
            </ol>
        </>
    );
};

export default Friends;