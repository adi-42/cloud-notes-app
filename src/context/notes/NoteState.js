import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const [state, setState] = useState({
        "name":"Aditya",
        "class":"L59"
    });
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"Raj",
                "class":"L60"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;