import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import { toast } from 'react-toastify'

interface Navprops{
  hastoken:boolean
  userMail:string | null
}
const NavBar = ({hastoken, userMail}:Navprops) => {
  const {logout} = useAuth()
  const navigate = useNavigate()
function signout() {
  logout();
  toast.info("You have been logged out.");
  navigate("/login");
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
        <span>{hastoken ? (userMail):("Guest")}</span>
        {hastoken ? (
          <>
       <button 
        onClick={signout} 
        className="text-white font-medium hover:text-gray-200 transition-colors"
      >
        Log Out
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
      
       
       {hastoken && (
      <Link 
        to="/add" 
        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200 font-medium"
      >
        Create Note
      </Link>
    )}

      </div>
    </nav>
  )
}

export default NavBar
