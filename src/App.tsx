import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Profile from './pages/Profile/profile'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App