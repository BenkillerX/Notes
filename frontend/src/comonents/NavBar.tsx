import { Link } from 'react-router-dom'

const NavBar = () => {
  return ( 
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow-md">
        <Link to="/">
        <h1 className="text-2xl font-bold text-white tracking-wide">
        Notes
      </h1>
        </Link>
      

      <Link 
        to="/add" 
        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200"
      >
        Create Note
      </Link>
    </nav>
  )
}

export default NavBar
