import { Route, Routes } from "react-router-dom"
import HomePage from "./comonents/HomePage"
import NavBar from "./comonents/NavBar"
import CreateNote from "./comonents/CreateNote"
import NoteDetails from "./comonents/NoteDetails"
import { ToastContainer } from "react-toastify"
import SignUp from "./comonents/SignUp"
import Login from "./comonents/Login"
import {jwtDecode} from "jwt-decode"

interface TokenPayload {
  userId: string
  role?: string
  email?: string
  exp: number
  iat: number
}
function App() {
  function isLoggedIn() {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decoded: TokenPayload = jwtDecode(token)
    const now = Date.now() / 1000
    return decoded.exp > now   // check if token is still valid
  } catch {
    return false
  }
}

const loggedIn = isLoggedIn()
  return (
    <div className="">
      <NavBar/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={loggedIn ? <HomePage/>: <Login/>}/>
        <Route path="/add" element={loggedIn ? <CreateNote/> : <Login/>}/>
        <Route path="/noteDetails/:id" element={loggedIn ?  <NoteDetails/>: <Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
