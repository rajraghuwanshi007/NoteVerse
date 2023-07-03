import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./Context/notes/NoteState";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Alert from "./components/Alert.js";

function App() {
  
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
