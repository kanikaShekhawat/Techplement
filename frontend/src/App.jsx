import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './components/HomePage'
import './index.css';



function App() {

  return (
    <>
  <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
  </Router>
    </>
  )
}

export default App
