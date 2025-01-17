import React, { useContext,useState , useEffect, useRef } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const navigate = useNavigate()
    const ref = useRef(null)
    const refClose = useRef(null)
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [note,setNote] = useState({id:"",etitle:'',edescription:'',etag:''})
    
    useEffect(() => { 
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
    })
    
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle: currentNote.title,edescription: currentNote.description, etag: currentNote.tag})
    }
    
    const handleClick = (e)=>{
        console.log("note updated",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        setNote({id:"",etitle:'',edescription:'',etag:''})
        props.showAlert("Updated Successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value} )
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="title" value={note.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription'  value={note.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="eform-control" id="tag" name='etag' value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;
