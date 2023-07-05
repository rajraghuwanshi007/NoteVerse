import React, { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

const Navbar = () => {
  const { User, getUser, setUser, loading } = useContext(NoteContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    navigate("/login");
  };

  useEffect(
    () => {
      (async () => {
        const user = await getUser();
        // Cannot use User state to check if it is updated or not because User will not be updated until the next render.
        if (user === "") {
          handleLogout();
        }
      })();
    },
    // eslint-disable-next-line
    []
  );
  if (loading) return <Spinner />;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <form className="d-flex">
              <span className="mx-1 navbar-text">Welcome {User}</span>
              <button className="btn btn-primary mx-1" onClick={handleLogout}>
                Logout
              </button>
            </form>
          ) : (
            <form className="d-flex">
              <Link className="btn btn-outline-info mx-1" to="/login" role="button">
                Sign In
              </Link>
              <Link className="btn btn-outline-info mx-1" to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
