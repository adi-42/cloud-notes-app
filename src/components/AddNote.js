import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export const AddNote = () => {
    const context = useContext(noteContext);
    const {addnote} = context;
       
    const [note, setNote] = useState({title:"", description:"", tag:"default"});

    const handleClick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag );
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
    <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="title" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="desc" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add to notes</button>
        </form>
    </div>
  )
}

export default AddNote;
