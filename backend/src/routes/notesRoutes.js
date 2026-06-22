import express from 'express'
import { createNote, deleteNote, getNotes, getSingleNote, updateNote } from '../controllers/noteController.js'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getSingleNote)
router.post('/add', createNote)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

export default router