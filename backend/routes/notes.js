const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');
const {body, validationResult} = require('express-validator');

//Get all notes of a user: GET -> "/api/notes/fetchallnotes". Login token req.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user : req.user.id});
        res.json(notes);
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Add a new note: Post -> "/api/notes/addnote". Login token req.
router.post('/addnote', fetchuser, [
    body('title', 'Title cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty()
],async (req, res) => {
    //Validate data format
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const {title, description, tag} = req.body;
        const note = new Note({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save(); 
        res.json(savedNote);
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;