import { Link } from "react-router-dom"
import './header.css'

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>|
        <Link to="/othello">Othello</Link>|
        <Link to="/metronome">Metronome</Link>|
        <Link to="/schedule">Schedule</Link>|
      </header>
    </>
  )
}

export default Header