import { Route, Routes } from "react-router-dom";
import HomePage from "./comonents/HomePage";
import NavBar from "./comonents/NavBar";
import CreateNote from "./comonents/CreateNote";
import NoteDetails from "./comonents/NoteDetails";
import { ToastContainer } from "react-toastify";
import SignUp from "./comonents/SignUp";
import Login from "./comonents/Login";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/AuthContext";

interface TokenPayload {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat: number;
}

function App() {
  const { token } = useAuth();
  const [hasToken, setHasToken] = useState<boolean>(() => {
    if (!token) return false;
    try {
      const decoded: TokenPayload = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  });

  const [userMail, setUserMail] = useState<string | null>(() => {
    if (!token) return null;
    try {
      const decoded: TokenPayload = jwtDecode(token);
      return decoded.email;
    } catch {
      return null;
    }
  });

  // Update state whenever token changes (login/logout)
  useEffect(() => {
    if (!token) {
      setHasToken(false);
      setUserMail(null);
      return;
    }
    try {
      const decoded: TokenPayload = jwtDecode(token);
      setUserMail(decoded.email);
      const now = Date.now() / 1000;
      setHasToken(decoded.exp > now);
    } catch {
      setHasToken(false);
      setUserMail(null);
    }
  }, [token]);

  return (
    <>
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
        theme="colored"
        limit={3}
      />

      <NavBar hastoken={hasToken} userMail={userMail} />

      <Routes>
        <Route path="/" element={hasToken ? <HomePage /> : <Login />} />
        <Route path="/add" element={hasToken ? <CreateNote /> : <Login />} />
        <Route
          path="/noteDetails/:id"
          element={hasToken ? <NoteDetails /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
