import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";
const host = process.env.REACT_APP_HOST;

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { showAlert, setUser, loading, getUser } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.Success) {
        localStorage.setItem("token", json.authtoken);
        showAlert("Logged in Successfully", "success");
        setUser(()=>getUser());
        navigate("/");
      } else {
        showAlert("Incorrect Credentials", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if (loading) return <Spinner />;
  return (
    <div className="container w-50 card border-dark mb-3">
    <form className="form-signin">
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal card-body text-dark">Login to NoteVerse</h1>
      </div>

      <div className="form-label-group">
        <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" onChange={handleChange} value={data.email} required autoFocus />
        <label htmlFor="inputEmail">Email address</label>
      </div>

      <div className="form-label-group">
        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={handleChange} value={data.password} required/>
        <label htmlFor="inputPassword">Password</label>
      </div>
      <div className="text-center"><button className="btn btn-lg btn-outline-primary btn-block" type="submit" onClick={handleSubmit}>Sign in</button></div>
    </form>
    </div>
  );
}
