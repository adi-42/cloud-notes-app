import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:4000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Get all Notes
    const getNotes = async (title, description, tag) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDIzNjVjODY0M2Q2MzVlZTZjMDNiIn0sImlhdCI6MTY5NDExMDQ1Nn0.bCl0SObiMLdxpVPIJsbLyfCcOpaySNGBZheL_Dyft5k'
            }
        });
        const json = await response.json();
        setNotes(json); 
    }

    //Add a note
    const addnote = async (title, description, tag) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDIzNjVjODY0M2Q2MzVlZTZjMDNiIn0sImlhdCI6MTY5NDExMDQ1Nn0.bCl0SObiMLdxpVPIJsbLyfCcOpaySNGBZheL_Dyft5k'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        //Client side logic
        const note = {
            "_id": "64fa1a1d8fccc58fb81f6c6bc",
            "user": "64f42365c8643d635ee6c03b4",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    //Delete a note
    const deletenote = (id) =>{
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    //Edit  a note
    const editnote = async (id, title, description, tag) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNDIzNjVjODY0M2Q2MzVlZTZjMDNiIn0sImlhdCI6MTY5NDExMDQ1Nn0.bCl0SObiMLdxpVPIJsbLyfCcOpaySNGBZheL_Dyft5k'
            },
            body: JSON.stringify({title, description, tag})
        }); 
        //Client side logic
        for(let index=0; index<notes.length; index++){
            const element = notes[index];
            if(element._id===id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{notes, getNotes, addnote, deletenote, editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;