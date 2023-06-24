import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 

const NoteForm = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/note`, {
            title: title,
            body: body
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.message) { 
                    setErrors({...errors, title: err.response.data.message});
                } else if (err.response.data.errors) { 
                    const validationErrors = {};
                    for (let key in err.response.data.errors) {
                        validationErrors[key] = err.response.data.errors[key].properties.message;
                    }
                    setErrors(validationErrors);
                }
            }
        })
    }
    

    return (
        <>
        <h1>Write Notes</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='form-group row'>
                <label htmlFor="title" className='col-sm-2 col-form-label'>Title</label>
                <div className='col-sm-10'>
                    <input type="text" name="title" onChange = {(e) => setTitle(e.target.value)} className='form-control'/>
                    {errors.title && <p className='text-danger'>{errors.title}</p>}
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor="body" className='col-sm-2 col-form-label'>Note Body</label>
                <div className='col-sm-10'>
                    <input type="textarea" name="body" onChange = {(e) => setBody(e.target.value)} className='form-control'/>
                    {errors.body && <p className='text-danger'>{errors.body}</p>}
                </div>
            </div>
            <input type="submit" className='btn btn-success'/>
            <button  className='btn btn-primary' onClick={() => navigate("/")}>Go Back</button>
        </form>
    </>
    )
}
export default NoteForm;