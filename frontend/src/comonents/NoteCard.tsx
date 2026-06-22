import type React from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../config/api'

interface Note {
  _id: string
  title: string
  content: string
}

type SetNotes = React.Dispatch<React.SetStateAction<Note[]>>


interface NoteCardProps {
  note: Note
  setNotes:SetNotes
}

const NoteCard: React.FC<NoteCardProps> = ({ note, setNotes }) => {
  async function handleDelete(e:React.MouseEvent,id:string) {
    e.preventDefault()
    e.stopPropagation()
  try {
    if (!id) return 
  await api.delete(`http://localhost:5000/api/notes/delete/${id}`)
  setNotes(prev => prev.filter(n => n._id !== id))
    toast.success("Note deleted Successfully")
  } catch (error) {
    toast.error("Error Deleting Note")
    console.log(error);
    
  }
  
}
  return (
    <Link to={`/noteDetails/${note._id}`}>
         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>
          <p className="mt-2 text-gray-600">{note.content}</p>
        </div>
        <div className="flex space-x-3 b-0 pt-2">
          <button
            className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <FiEdit className="mr-1" /> Edit
          </button>
          <button
            className="flex items-center rounded-md bg-red-50 px-3 py-1 text-red-600 hover:bg-red-100 transition-colors"
            onClick={(e)=>handleDelete(e,note._id)}
          >
            <FiTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
    </Link>
   
  )
}

export default NoteCard
