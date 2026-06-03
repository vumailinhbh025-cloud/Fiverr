import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAdminSession, getStoredAdminSession } from './adminAuth'

const AdminLayout = () => {
  const navigate = useNavigate()
  const adminSession = getStoredAdminSession()

  if (!adminSession) {
    return <Navigate to="/admin/login" replace />
  }

  const logout = () => {
    clearAdminSession()
    navigate('/admin/login')
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <aside className="bg-dark text-white p-3" style={{ width: 260 }}>
        <h3 className="fw-bold">Admin</h3>
        <p className="small text-white-50 mb-0">{adminSession.email || adminSession.name || 'admin'}</p>
        <nav className="nav flex-column mt-4">
          <NavLink to="" end className="nav-link text-white">Dashboard</NavLink>
          <NavLink to="users" className="nav-link text-white">Users</NavLink>
          <NavLink to="jobs" className="nav-link text-white">Jobs</NavLink>
        </nav>
        <button className="btn btn-outline-light w-100 mt-4" onClick={logout}>
          Đăng xuất
        </button>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
