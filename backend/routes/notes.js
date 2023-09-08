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

//Update an existing note: Put -> "/api/notes/updatenote". Login token req.
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty()
],async (req, res) => {
    //Validate data format
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        //create new note object
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find note to be updated
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note does not exist");
        };
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access restricted");
        };
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Delete note: Delete -> "/api/notes/deletenote". Login token req.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find note to be deleted
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note does not exist");
        };
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access restricted");
        };
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Status":"Note has been deleted", note});
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;