import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RandomNote = (props) => {
    const [note, setNote] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/note/random")
            .then((res) => {
                if (res.data.length > 0) {
                    console.log(res.data);
                    setNote(res.data[0]);
                } else {
                    // Handle case where no notes are available
                    console.log("No notes available");
                    setNote(null); // Set note to null to indicate no note available
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const goBack = () => {
        navigate("/");
    };
    return (
        <div>
            <h2>Note Wall</h2>
            <p>Random Note</p>
            {note ? (
                <>
                    <p>{note.title}</p>
                    <p>{note.body}</p>
                </>
            ) : (
                <p>No notes available</p>
            )}
            <button className="btn btn-primary" onClick={goBack}>
                Go Back
            </button>
        </div>
    );
};

export default RandomNote;
