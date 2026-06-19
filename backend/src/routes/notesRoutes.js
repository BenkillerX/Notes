import express from 'express'
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/noteController.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/add', createNote)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

export default router