import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Profile from './pages/Profile/profile'
import { AdminUsers } from './pages/AdminDashboard/adminDashboard'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import Register from './pages/Register/register'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
