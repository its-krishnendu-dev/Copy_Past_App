
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center gap-4 border-b border-white/10 bg-linear-to-r from-violet-700 via-purple-700 to-indigo-700 px-4 py-4 shadow-lg shadow-purple-950/30">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `rounded-xl px-6 py-2.5 font-semibold transition duration-300 ${
            isActive
              ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
              : 'text-slate-200 hover:bg-white/10 hover:text-white'
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `rounded-xl px-6 py-2.5 font-semibold transition duration-300 ${
            isActive
              ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
              : 'text-slate-200 hover:bg-white/10 hover:text-white'
          }`
        }
      >
        Pastes
      </NavLink>
    </nav>
  )
}

export default Navbar