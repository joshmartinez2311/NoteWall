import React, { useState } from "react";
import NoteList from "../components/NoteList";
import { Link } from 'react-router-dom';
const Main = (props) => {
    const [ note, setNote] = useState([]);

    const removeFromDom = noteId => {
        setNote(note.filter(note => note._id !== noteId));
    }

    return (
        <div className="container">  
            <div className="row"> 
                <Link className="col" to="/note/create">Create Note</Link>
            </div>
            <div className="row"> 
                <div className="col">
                    <NoteList note={note} setNote={setNote} removeFromDom={removeFromDom} />
                </div>
            </div> 
        </div>
    )
}
export default Main;