import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = (props) => {
    const {id} = useParams();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/note/${id}`)
        .then(res => {
            setTitle(res.data.title);
            setBody(res.data.body);
        })
            .catch(err => console.log(err))
    }, [id])

    const updateNote = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/note/${id}`, {
            title: title,
            body:body
        })
        .then( res => {
            console.log(res);
            navigate("/")
        })
        .catch(err => console.log(err))
    }
    
    const deleteNote = () => {
    axios.delete(`http://localhost:8000/api/note/${id}`)
        .then(res => {
        console.log(res);
        navigate("/"); // Redirect to the form list page
        })
        .catch(err => console.log(err));
    };
    return (
        <>
        <h1>Update Note</h1>
        <form onSubmit={updateNote}>
            <div className='form-group row'>
                <label htmlFor="title" className='col-sm-2 col-form-label'>Title</label>
                <div className='col-sm-10'>
                    <input type="text" name="title"  value={title} onChange = {(e) => setTitle(e.target.value)} className='form-control'/>
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor="body" className='col-sm-2 col-form-label'>Note Body</label>
                <div className='col-sm-10'>
                    <input type="text" name="body" value={body} onChange = {(e) => setBody(e.target.value)} className='form-control'/>
                </div>
            </div>
            <input type="submit" className='btn btn-success'/>
            <button className="btn btn-primary" onClick={() => navigate("/")}>Go Back</button>
            <button className="btn btn-danger" onClick={deleteNote}>Delete Note</button>
        </form>
    </>
    )
}
export default EditNote;