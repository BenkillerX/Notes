import { Route, Routes } from "react-router-dom"
import HomePage from "./comonents/HomePage"
import NavBar from "./comonents/NavBar"
import CreateNote from "./comonents/CreateNote"
import NoteDetails from "./comonents/NoteDetails"
import { ToastContainer } from "react-toastify"
import SignUp from "./comonents/SignUp"
import Login from "./comonents/Login"
import {jwtDecode} from "jwt-decode"
import { useEffect, useState } from "react"

interface TokenPayload {
  userId: string
  role: string
  email: string
  exp: number
  iat: number
}
function App() {
  
  const [hasToken, setHasToken] = useState<boolean>(false);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHasToken(false);
      return;
    }
    try {
      const decoded: TokenPayload = jwtDecode(token);
      const now = Date.now() / 1000;
      setHasToken(decoded.exp > now);
    } catch {
      setHasToken(false);
    }
  }, []);


  return (
    <div>
      <NavBar hastoken={hasToken} />
      <Routes>
        <Route path="/" element={hasToken ? <HomePage /> : <Login />} />
        <Route path="/add" element={hasToken ? <CreateNote /> : <Login />} />
        <Route path="/noteDetails/:id" element={hasToken ? <NoteDetails /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App
