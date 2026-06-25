import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

interface Navprops{
  hastoken:boolean
}
const NavBar = ({hastoken}:Navprops) => {
  const {logout} = useAuth()
  const navigate = useNavigate()
  function signout() {
    logout()
 navigate("/login") 
}

  return ( 
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide hover:text-gray-200 transition-colors">
          Notes
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {hastoken ? (
          <>
        <button onClick={signout}>
        LogOut
        </button>
        </>
        ) : (
          <>
           <Link 
          to="/signup" 
          className="text-white font-medium hover:text-gray-200 transition-colors"
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          className="text-white font-medium hover:text-gray-200 transition-colors"
        >
          Login
        </Link>
        </>
        )}
      
       
        <Link 
          to="/add" 
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200 font-medium"
        >
          Create Note
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
