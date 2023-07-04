const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    res.json(error);
  }
});

// Route 2: Add a new Note using : POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchUser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      // If there are errors, return Bad request and the errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const temp = await note.save();
      res.json(note);
    } catch (error) {
      res.json({ error });
    }
  }
);

// Route 3: Update and existing Note using : POST "/api/notes/update" - Login required
router.put(
  "/updatenote/:id",
  fetchUser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      // If there are errors, return Bad request and the errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { $set: { title, description, tag } },
        // new: true returns the document after update was applied.
        // new: true returns the document before update was applied.
        { new: true }
      );
      if (!note) {
        res.status(401).json("Invalid request");
      } else res.json(note);
    } catch (error) {
      res.json({ error });
    }
  }
);

// Route 4: Delete Note using : DELETE "/api/notes/update" - Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Note.findOneAndRemove({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!note) {
      res.status(401).json("Invalid request");
    } else res.json({ Success: "Note has been deleted", note });
  } catch (error) {
    res.json({ error });
  }
});

// Route 5: Get all the Sections using : GET "/api/notes/getSections"
router.get("/getSections", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id }).distinct("tag");
    res.json(note);
  } catch (error) {
    res.json(error);
  }
});

// Route 6: Get all the notes of a particular tag using : GET "/api/notes/fetchallnotes/:tag"
router.get("/fetchalltagnote/:tag", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id ,tag:req.params.tag});
    res.json(note);
  } catch (error) {
    res.json(error);
  }
});


module.exports = router;
