import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Othello from './pages/Othello'
import Metronome from './pages/Metronome'
import Schedule from './pages/Schedule'
import TheGame from './pages/TheGame'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/othello" element={<Othello />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/thegame" element={<TheGame />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
