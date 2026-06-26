import Note from "../model/Notes.js";

export async function getNotes(req, res) {
    try {
        const notes = await Note.find({userId: req.user.userId}).sort({ createdAt: -1 })
        res.json(notes)
    } catch (error) {
        console.error("Error Fetching Notes", error);
    }
}
export async function getSingleNote(req,res) {
    const {id} = req.params
    if(!id){
       return res.status(400).json({message:"Missing ID"})
    } 

    const singleNote = await Note.findById(id)
    if(!singleNote){
        return res.status(404).json({message:"Note Not Found"})
    }
    res.status(200).json(singleNote)
}
export async function createNote(req, res) {
  const { title, content } = req.body
  const { userId } = req.user

  if (!title || !content) {
    return res.status(400).json({ message: "Provide title and content" })
  }

  try {
    const newNote = new Note({ title, content, userId })
    await newNote.save()

    return res.status(201).json({
      success: true,
      newNote,
      message: "Note created successfully"
    })
  } catch (error) {
    console.error("Error Occurred while creating note:", error)
    return res.status(500).json({ message: "Server error creating note" })
  }
}

export async function updateNote(req, res) {
    const {title, content} = req.body;
    const {id} = req.params;
    if(!title || ! content || !id){
     return  res.status(400).json({message:"provide necessary content"});
    }
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new:true, runValidators: true })
        if(!updatedNote){
            res.status(404).json({message:"Note not found"})
            return
        }
        res.status(200).json(updatedNote)

    } catch (error) {
        console.log("Error Occured", error);
    }
}
export async function deleteNote(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Provide an id first" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Server error while deleting note" });
  }
}
export function uploadImage() {
  
}