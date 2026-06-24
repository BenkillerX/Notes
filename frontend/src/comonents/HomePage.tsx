import { useEffect, useState } from 'react'
import Loading from './Loading'
import NoteCard from './NoteCard'
import Error from './Error'
import api from '../config/api'

interface Notes{
    _id:string,
    title:string,
    content:string,
}
const HomePage = () => {
    const [notes, setNotes] = useState<Notes[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    useEffect(()=>{
        async function getNotes() {
            try {
            setLoading(true)
            setError(null)
            const notes = await api.get('notes/', {timeout:5000});
            if (notes.status !== 200) {
                console.log("Could Not Get Notes");
                
            }
            console.log(notes.data);
            setNotes(notes.data)
            } catch (error) {
                console.log('Error Fetching Notes', error);
                setError("Error Fetching Note")
                
            }finally{
                setLoading(false)
            }
        }
        getNotes()
    },[])
  return (
    <div>
    {loading && <Loading/>}
    {error && <Error message={error}/>}
   <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {notes.map((note) => (
    <NoteCard note={note} key={note._id} setNotes={setNotes}/>
  ))}
</section>

    </div>
  )
}

export default HomePage
