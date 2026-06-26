import express from 'express'
import { createNote, deleteNote, getNotes, getSingleNote, updateNote, uploadImage } from '../controllers/noteController.js'
import { authMiddleWear } from '../middlewear/authMiddleWear.js'

const router = express.Router()

router.get('/', authMiddleWear, getNotes)
router.get('/:id', getSingleNote)
router.post('/add',authMiddleWear ,createNote)
router.post('/upload', uploadImage)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

export default router