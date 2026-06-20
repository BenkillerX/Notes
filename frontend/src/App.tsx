import { Route, Routes } from "react-router-dom"
import HomePage from "./comonents/HomePage"
import NavBar from "./comonents/NavBar"
import CreateNote from "./comonents/CreateNote"
import NoteDetails from "./comonents/NoteDetails"
import { ToastContainer } from "react-toastify"

function App() {

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
        <Route path="/" element={<HomePage/>}/>
        <Route path="/add" element={<CreateNote/>}/>
        <Route path="/noteDetails/:id" element={<NoteDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
