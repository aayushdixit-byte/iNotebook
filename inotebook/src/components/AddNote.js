import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note,setNote] = useState({title:'',description:'',tag:''})
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:'',description:'',tag:''})
        props.showAlert("Added Successfully","success")
        // console.log(json.authtoken)
        console.log(localStorage.getItem("token"))
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value} )
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
