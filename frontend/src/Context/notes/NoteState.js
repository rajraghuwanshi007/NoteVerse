import { useState } from "react";
import NoteContext from "./NoteContext";
const host = process.env.REACT_APP_HOST;

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [tagNotes, setTagNotes] = useState([]);
  const [sections, setSections] = useState([]);
  const [alert, setAlert] = useState(null);
  const [User, setUser] = useState("");
  const [sentReq, setSentReq] = useState([]);
  const [recReq, setRecReq] = useState([]);
  const [friend, setFriend] = useState([]);
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

// get all recieved friend request
const getAllRec = async ()=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/showRecReq`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setRecReq(() => json);
    } else {
      setRecReq(() => []);
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// get all sent friend request
const getAllSent = async ()=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/showSentReq`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setSentReq(() => json);
    } else {
      setSentReq(() => []);
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};


// Accept Friend request 
const accReq=async (user)=>{
  try {
    setLoading(true);
    const { name, email } = user;
    const response = await fetch(`${host}/api/auth/accReq`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, email }), // body data type must match "Content-Type" header
    });
    let res = await response.json();
    if (response.status === 200) {
      setRecReq(res.rec);
      showAlert("Added As Friend", "success");
    } else {
      showAlert("Operation Unsuccessful", "danger");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// Delete Recieved Friend request 
const delReq=async (email)=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/delReq`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    let res = await response.json();
    if (response.status === 200) {
      setRecReq(res.Rec);
      showAlert(" Deleted Request", "success");
    } else {
      showAlert("Operation Unsuccessful", "danger");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// Delete Sent Friend request 
const delSentReq=async (email)=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/delSentReq`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    let res = await response.json();
    if (response.status === 200) {
      setSentReq(res.sent);
      showAlert(" Deleted Request", "success");
    } else {
      showAlert("Operation Unsuccessful", "danger");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// Send Friend request 
const makeReq=async (email)=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/sendReq`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    let res = await response.json();
    if (response.status === 200) {
      setSentReq(res.Sent)
      showAlert("Request Sent", "success");
    } else {
      showAlert("Operation Unsuccessful", "danger");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};


// get all friends
const getAllFrnd = async ()=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/showFriends`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setFriend(() =>json);
    } else {
      setFriend(() => []);
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};


// Delete Recieved Friend request 
const delFrnd=async (email)=>{
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/delFrnd`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    let res = await response.json();
    if (response.status === 200) {
      setFriend(res.friends);
      showAlert(" Removed Friend", "success");
    } else {
      showAlert("Operation Unsuccessful", "danger");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// get all notes
const getAllSharedNotes = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/shared/fetchallsharednotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      setSharedNotes(() => json);
    } else {
      setSharedNotes(() => []);
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};  

  // add a shared note
  const addSharedNote = async (note, to) => {
    try {
      setLoading(true);
      const {title,description,tag}=note;
      const newNote = {
        title,
        description,
        tag,
        to,
      };
      const response = await fetch(`${host}/api/shared/addsharednote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newNote), // body data type must match "Content-Type" header
      });
      const temp = await response.json();
      setSharedNotes((prev) => prev.concat(temp));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

 // delete a shared note
 const deleteSharedNote = async (id,to) => {
  try {
    setLoading(true);
    const response = await fetch(`${host}/api/shared/deletesharednote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      setSharedNotes((prev) => {
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
        getAllSent,
        getAllRec,
        recReq,
        sentReq,
        accReq,
        delReq,
        makeReq,
        delSentReq,
        getAllFrnd,
        friend,
        delFrnd,
        getAllSharedNotes,
        sharedNotes,
        addSharedNote,
        deleteSharedNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
