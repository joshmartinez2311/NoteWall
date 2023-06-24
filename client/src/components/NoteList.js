import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const NoteList = (props) => {
    const [note, setNote] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/note")
        .then((res) => {
            console.log(res.data);
            setNote(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    const getSortedNotes = (order) => {
        axios.get(`http://localhost:8000/api/note/${order}`)
        .then((res) => {
            console.log(res.data);
            setNote(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    return (
        <div>
            <h1>Note Wall</h1>
            <button className="btn-m btn-secondary" onClick={() => getSortedNotes("oldest")}>Sort by Oldest</button>
            <button className="btn-m  btn-secondary" onClick={() => getSortedNotes("newest")}>Sort by Newest</button>
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    note.map((note, index) => {
                        return (
                        <tr key={note._id}>
                            <td>{note.title}</td>
                            <td>{note.body}</td>
                            <td>
                            <Link to = {`/note/edit/${note._id}`}>Edit</Link>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Link className="btn btn-secondary" to="/note/random">Random Note</Link>
        </div>
    )
}
export default NoteList;