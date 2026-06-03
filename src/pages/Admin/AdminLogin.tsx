import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { httpClient } from '../../util/config'
import {
  asString,
  getRoleFromAuthResponse,
  getStoredAdminSession,
  isAdminRole,
  saveAdminSession,
  type AuthResponseContent,
  type AdminSession,
} from './adminAuth'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const adminSession = getStoredAdminSession()

  if (adminSession) {
    return <Navigate to="/admin/users" replace />
  }

  const handleAdminLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    try {
      const res = await httpClient.post('/api/auth/signin', {
        email: authEmail,
        password: authPassword,
      })

      const responseData = res.data as { content?: unknown } & AuthResponseContent
      const content = (responseData.content ?? responseData) as AuthResponseContent
      const token = asString(content.token ?? content.accessToken ?? content.user?.accessToken)
      const role = getRoleFromAuthResponse(content, token)

      if (!token) {
        throw new Error('Không nhận được token từ hệ thống.')
      }

      if (!isAdminRole(role)) {
        throw new Error('Tài khoản này không có quyền admin.')
      }

      const session: AdminSession = {
        id: content.user?.id,
        name: content.user?.name ?? content.user?.email ?? authEmail,
        email: content.user?.email ?? authEmail,
        role: role ?? 'admin',
        token,
      }

      saveAdminSession(session)
      setAuthPassword('')
      navigate('/admin/users')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string; content?: string } }; message?: string }
      setAuthError(apiError.response?.data?.message || apiError.response?.data?.content || apiError.message || 'Đăng nhập thất bại')
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-lg overflow-hidden border-0 rounded-4">
            <div className="row g-0">
              <div className="col-12 col-md-5 bg-dark text-white p-5 d-flex flex-column justify-content-between" style={{ minHeight: 560 }}>
                <div>
                  <div className="badge bg-warning text-dark mb-3">Admin Access</div>
                  <h2 className="fw-bold mb-3">Đăng nhập quản trị</h2>
                  <p className="text-white-50 mb-0">
                    Nhập tài khoản admin để truy cập danh sách người dùng, tìm kiếm công việc và các công cụ quản trị.
                  </p>
                </div>
                <div className="small text-white-50">
                  Hệ thống sẽ kiểm tra role từ token trả về bởi API <code>auth/signin</code>.
                </div>
              </div>

              <div className="col-12 col-md-7 bg-white p-5" style={{ minHeight: 560 }}>
                <h3 className="fw-bold mb-2">Đăng nhập Admin</h3>
                <p className="text-muted mb-4">Chỉ tài khoản có role admin mới được vào khu vực quản trị.</p>

                {authError && <div className="alert alert-danger">{authError}</div>}

                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="adminEmail">
                      Email
                    </label>
                    <input
                      id="adminEmail"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Nhập email admin"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold" htmlFor="adminPassword">
                      Mật khẩu
                    </label>
                    <input
                      id="adminPassword"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Nhập mật khẩu"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg w-100" disabled={authLoading}>
                    {authLoading ? 'Đang kiểm tra...' : 'Đăng nhập quản trị'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
