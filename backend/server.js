import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import router from './src/routes/notesRoutes.js'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/notes', router)
connectDB().then(()=>{
app.listen(PORT,()=>{
console.log(`Server running on ${PORT}`)})
})
