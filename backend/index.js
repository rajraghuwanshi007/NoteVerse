const connect = require("./db");
connect();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.port || 5000;

app.use(cors()); // Use this after the variable declaration

app.use(express.json());

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("NoteVerse project!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
