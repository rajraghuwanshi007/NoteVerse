import { useState } from "react";
import NoteContext from "./NoteContext";
const host = process.env.REACT_APP_HOST;

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [tagNotes, setTagNotes] = useState([]);
  const [sections, setSections] = useState([]);
  const [alert, setAlert] = useState(null);
  const [User, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  // get all notes
  const getAllNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.status === 200) {
        setNotes(() => json);
      } else {
        setNotes(() => []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };  
  //fetch all sections
  const getAllSections = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/getSections`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.status === 200) {
        setSections(() => json);
      } else {
        setSections(() => []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch all notes of a particular tag 
  const fetchAllTagNote = async (tag) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/fetchalltagnote/${tag}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.status === 200) {
        setTagNotes(() => json);
      } else {
        setTagNotes(() => []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add a note
  const addNote = async (title, description, tag) => {
    try {
      setLoading(true);
      const newNote = {
        title,
        description,
        tag,
      };
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newNote), // body data type must match "Content-Type" header
      });
      const temp = await response.json();
      setNotes((prev) => prev.concat(temp));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add tag notes
  const addTagNote = async (title, description, tag) => {
    try {
      setLoading(true);
      const newNote = {
        title,
        description,
        tag,
      };
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newNote), // body data type must match "Content-Type" header
      });
      const temp = await response.json();
      setTagNotes((prev) => prev.concat(temp));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setNotes((prev) => {
          return prev.filter((note) => {
            return note._id !== id;
          });
        });
        showAlert("Deleted Successfully", "success");
      } else {
        showAlert("Operation Unsuccessful", "danger");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete a tagged note
  const deleteTagNote = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setTagNotes((prev) => {
          return prev.filter((note) => {
            return note._id !== id;
          });
        });
        showAlert("Deleted Successfully", "success");
      } else {
        showAlert("Operation Unsuccessful", "danger");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // edit a note
  const editNote = async (updatedNote) => {
    try {
      setLoading(true);
      const { title, description, tag, _id } = updatedNote;
      const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      updatedNote = await response.json();
      if (response.status === 200) {
        setNotes((prev) => {
          return prev.map((note) => {
            if (note._id !== _id) {
              return note;
            } else {
              return updatedNote;
            }
          });
        });
        showAlert("Updated Successfully", "success");
      } else {
        showAlert("Operation Unsuccessful", "danger");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // edit a tagged note
  const editTagNote = async (updatedNote) => {
    try {
      setLoading(true);
      const { title, description, tag, _id } = updatedNote;
      const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      updatedNote = await response.json();
      if (response.status === 200) {
        setTagNotes((prev) => {
          return prev.map((note) => {
            if (note._id !== _id) {
              return note;
            } else {
              return updatedNote;
            }
          });
        });
        showAlert("Updated Successfully", "success");
      } else {
        showAlert("Operation Unsuccessful", "danger");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // show alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // get user
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        setUser(() => json.user.name);
        setLoading(false);
        return json.user.name;
      } else {
        setUser(() => "");
        setLoading(false);
        return "";
      }
    } catch (error) {
      showAlert(error, "danger");
      setUser(() => "");
      return "";
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        alert,
        showAlert,
        User,
        setUser,
        getUser,
        loading,
        sections,
        getAllSections,
        fetchAllTagNote,
        tagNotes,
        editTagNote,
        deleteTagNote,
        addTagNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
