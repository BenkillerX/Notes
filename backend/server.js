import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import router from './src/routes/notesRoutes.js'
import cors from 'cors'
import userRouter from './src/routes/userRoutes.js'
import multer from 'multer'
import { uploadImage } from './src/controllers/uploads.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/src/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({storage})

app.use(cors())
app.use(express.json())

app.use('/api/notes', router)
app.use('/api/auth', userRouter)


app.post('/api/uploads',  upload.single('file'), uploadImage)
connectDB().then(()=>{
app.listen(PORT,()=>{
console.log(`Server running on ${PORT}`)})
})
