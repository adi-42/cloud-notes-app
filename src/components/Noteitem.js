import React from 'react'

function Noteitem(props) {
    const {note} = props;
    return (
    <div className="col-md-4">   
    <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <p className="card-title"><strong>{note.title}</strong></p>
                <i className="fa-solid fa-pen-to-square mx-2"></i>
                <i className="fa-solid fa-trash mx-2"></i>   
                <i className="fa-solid fa-circle-info mx-2"></i>
            </div>
            <p className="card-text">{note.description}</p>
        </div>
    </div>
    </div>
  )
}

export default Noteitem