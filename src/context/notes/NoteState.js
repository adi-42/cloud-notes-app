import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "64fa1a1d8fccc58fb81f6c6b",
            "user": "64f42365c8643d635ee6c03b",
            "title": "first note",
            "description": "I am sending my first note to the app.",
            "tag": "testing ",
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        },
        {
            "_id": "64fb1b799a48b3339dc500af",
            "user": "64f42365c8643d635ee6c03b",
            "title": "testing delete",
            "description": "i want this gone.",
            "tag": "testing",
            "date": "2023-09-08T13:02:49.059Z",
            "__v": 0
        },
        {
            "_id": "64fb1f1d3f3a632bdcbd6077",
            "user": "64f42365c8643d635ee6c03b",
            "title": "testing npm script",
            "description": "npm run add-servers",
            "tag": "testing",
            "date": "2023-09-08T13:18:21.456Z",
            "__v": 0
        },
        {
            "_id": "64fa1a1d8fccc58fb81f6c6b",
            "user": "64f42365c8643d635ee6c03b",
            "title": "first note",
            "description": "I am sending my first note to the app.",
            "tag": "testing ",
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        },
        {
            "_id": "64fa1a1d8fccc58fb81f6c6b",
            "user": "64f42365c8643d635ee6c03b",
            "title": "first note",
            "description": "I am sending my first note to the app.",
            "tag": "testing ",
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        },
        {
            "_id": "64fa1a1d8fccc58fb81f6c6b",
            "user": "64f42365c8643d635ee6c03b",
            "title": "first note",
            "description": "I am sending my first note to the app.",
            "tag": "testing ",
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        },
        {
            "_id": "64fa1a1d8fccc58fb81f6c6b",
            "user": "64f42365c8643d635ee6c03b",
            "title": "first note",
            "description": "I am sending my first note to the app.",
            "tag": "testing ",
            "date": "2023-09-07T18:44:45.346Z",
            "__v": 0
        },
    ]
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;