import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../../util/config'
import { clearAdminSession, getStoredAdminSession } from './adminAuth'

type UserItem = {
  id?: number | string
  name?: string
  email?: string
  role?: string
  [key: string]: unknown
}

type CreateUserForm = {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  gender: boolean
  role: string
  skill: string
  certification: string
}

type JobItem = {
  id?: number | string
  tenCongViec?: string
  tenLoaiCongViec?: string
  giaTien?: number | string
  tieuDe?: string
  title?: string
  ten?: string
  congViec?: {
    tenCongViec?: string
    tenLoaiCongViec?: string
  }
  [key: string]: unknown
}

const perPageOptions = [10, 20, 50]
const emptyCreateUserForm: CreateUserForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  birthday: '',
  gender: true,
  role: 'USER',
  skill: '',
  certification: '',
}

const asString = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return ''
}

const parseOptionalList = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)

const Users = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | string | null>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<CreateUserForm>(emptyCreateUserForm)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [jobKeyword, setJobKeyword] = useState('')
  const [jobPageIndex, setJobPageIndex] = useState(1)
  const [jobPageSize, setJobPageSize] = useState(10)
  const [jobResults, setJobResults] = useState<JobItem[]>([])
  const [jobTotal, setJobTotal] = useState<number | null>(null)
  const [jobLoading, setJobLoading] = useState(false)
  const [jobError, setJobError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await httpClient.get('/api/users')
      const responseData = res.data as { content?: unknown; [key: string]: unknown }
      const rawData = responseData.content ?? res.data
      let list: UserItem[] = []

      if (Array.isArray(rawData)) {
        list = rawData as UserItem[]
      } else if (Array.isArray(res.data)) {
        list = res.data as UserItem[]
      } else if (rawData && typeof rawData === 'object') {
        const arr = Object.values(rawData).find((value) => Array.isArray(value))
        if (Array.isArray(arr)) {
          list = arr as UserItem[]
        }
      }

      setUsers(list)
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { content?: string; message?: string } }; message?: string }
      console.error(err)
      setError(apiError.response?.data?.content || apiError.response?.data?.message || apiError.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCreateInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setCreateForm((current) => ({
      ...current,
      [name]: name === 'gender' ? value === 'true' : value,
    }))
  }

  const resetCreateForm = () => {
    setCreateForm(emptyCreateUserForm)
    setCreateError(null)
  }

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCreateLoading(true)
    setCreateError(null)

    try {
      const payload = {
        id: 0,
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        password: createForm.password,
        phone: createForm.phone.trim(),
        birthday: createForm.birthday,
        gender: createForm.gender,
        role: createForm.role,
        skill: parseOptionalList(createForm.skill),
        certification: parseOptionalList(createForm.certification),
      }

      await httpClient.post('/api/users', payload)
      resetCreateForm()
      setShowCreateForm(false)
      await fetchUsers()
      alert('Them user thanh cong!')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { content?: string; message?: string } }; message?: string }
      setCreateError(apiError.response?.data?.content || apiError.response?.data?.message || apiError.message || 'Them user that bai')
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDeleteUser = async (user: UserItem) => {
    if (!user.id) {
      alert('Khong tim thay id user de xoa.')
      return
    }

    const adminSession = getStoredAdminSession()
    if (!adminSession) {
      clearAdminSession()
      navigate('/admin/login')
      return
    }

    const displayName = getDisplayName(user)
    const confirmed = window.confirm(`Ban co chac muon xoa user "${displayName}" khong?`)
    if (!confirmed) return

    setDeletingId(user.id)
    setError(null)

    try {
      await httpClient.delete('/api/users', {
        params: { id: user.id },
      })
      await fetchUsers()
      alert('Xoa user thanh cong!')
    } catch (err: unknown) {
      const apiError = err as { response?: { status?: number; data?: { content?: string; message?: string } }; message?: string }
      if (apiError.response?.status === 401 || apiError.response?.status === 403) {
        clearAdminSession()
        navigate('/admin/login')
        return
      }
      setError(apiError.response?.data?.content || apiError.response?.data?.message || apiError.message || 'Xoa user that bai')
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter((u) => {
      const name = (u.name ?? u.hoTen ?? u.fullName ?? u.taiKhoan ?? '').toString().toLowerCase()
      const email = (u.email ?? u.emailAddress ?? '').toString().toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [users, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))

  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [page, totalPages])

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, perPage])

  const getDisplayName = (u: UserItem) => asString(u.name ?? u.hoTen ?? u.fullName ?? u.taiKhoan) || '-'

  const roleBadge = (r: string | undefined) => {
    const role = (r || '').toLowerCase()
    const cls = role.includes('admin') ? 'badge bg-danger' : role.includes('seller') ? 'badge bg-success' : 'badge bg-secondary'
    return <span className={cls}>{r || '-'}</span>
  }

  const getJobTitle = (j: JobItem) => asString(j.tenCongViec ?? j.congViec?.tenCongViec ?? j.tieuDe ?? j.title ?? j.ten) || '-'

  const searchJobs = useCallback(async (keyword: string, pageIndex: number = 1, pageSize: number = 10) => {
    setJobLoading(true)
    setJobError(null)
    try {
      const q = encodeURIComponent(keyword || '')
      const res = await httpClient.get(`/api/thue-cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${q}`)
      const responseData = res.data as {
        content?: unknown
        items?: unknown
        data?: unknown
        totalCount?: unknown
        totalRecords?: unknown
        total?: unknown
        meta?: { total?: unknown }
        totalElements?: unknown
      }
      const list = responseData.content ?? responseData.items ?? responseData.data ?? []
      const jobList = Array.isArray(list) ? (list as JobItem[]) : []
      setJobResults(jobList)

      const totalCount = responseData.totalCount ?? responseData.totalRecords ?? responseData.total ?? responseData.meta?.total ?? responseData.totalElements
      setJobTotal(typeof totalCount === 'number' ? totalCount : jobList.length)
      setJobPageIndex(pageIndex)
      setJobPageSize(pageSize)
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { content?: string; message?: string } }; message?: string }
      console.error('Job search error', err)
      setJobError(apiError.response?.data?.content || apiError.response?.data?.message || apiError.message || 'Failed to search jobs')
      setJobResults([])
      setJobTotal(null)
    } finally {
      setJobLoading(false)
    }
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Admin Users</h2>
          <p className="text-muted mb-0">Manage application users</p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Users</h4>
              <small className="text-muted">Add, search and review users</small>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <button
                className="btn btn-success text-nowrap"
                onClick={() => {
                  setShowCreateForm((current) => !current)
                  setCreateError(null)
                }}
              >
                {showCreateForm ? 'Dong form' : 'Them user'}
              </button>
              <div className="input-group">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or email" className="form-control" />
                <button className="btn btn-outline-secondary" onClick={() => { setQuery(''); setPage(1) }}>Clear</button>
              </div>
              <button className="btn btn-outline-secondary" onClick={fetchUsers} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {showCreateForm && (
            <form className="border rounded-3 p-3 mb-4 bg-light" onSubmit={handleCreateUser}>
              <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                  <h5 className="mb-1">Them user moi</h5>
                  <small className="text-muted">Skill va certification khong bat buoc. Neu nhap nhieu gia tri, phan tach bang dau phay.</small>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    resetCreateForm()
                    setShowCreateForm(false)
                  }}
                >
                  Huy
                </button>
              </div>

              {createError && <div className="alert alert-danger">{createError}</div>}

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createName">Name</label>
                  <input id="createName" name="name" className="form-control" value={createForm.name} onChange={handleCreateInputChange} required />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createEmail">Email</label>
                  <input id="createEmail" name="email" type="email" className="form-control" value={createForm.email} onChange={handleCreateInputChange} required />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createPassword">Password</label>
                  <input id="createPassword" name="password" type="password" className="form-control" value={createForm.password} onChange={handleCreateInputChange} required />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createPhone">Phone</label>
                  <input id="createPhone" name="phone" className="form-control" value={createForm.phone} onChange={handleCreateInputChange} required />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold" htmlFor="createBirthday">Birthday</label>
                  <input id="createBirthday" name="birthday" type="date" className="form-control" value={createForm.birthday} onChange={handleCreateInputChange} required />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold" htmlFor="createGender">Gender</label>
                  <select id="createGender" name="gender" className="form-select" value={String(createForm.gender)} onChange={handleCreateInputChange}>
                    <option value="true">Nam</option>
                    <option value="false">Nu</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold" htmlFor="createRole">Role</label>
                  <select id="createRole" name="role" className="form-select" value={createForm.role} onChange={handleCreateInputChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createSkill">Skill</label>
                  <input id="createSkill" name="skill" className="form-control" placeholder="React, TypeScript" value={createForm.skill} onChange={handleCreateInputChange} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" htmlFor="createCertification">Certification</label>
                  <input id="createCertification" name="certification" className="form-control" placeholder="AWS, Google Ads" value={createForm.certification} onChange={handleCreateInputChange} />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={resetCreateForm} disabled={createLoading}>
                  Xoa form
                </button>
                <button type="submit" className="btn btn-success" disabled={createLoading}>
                  {createLoading ? 'Dang them...' : 'Them user'}
                </button>
              </div>
            </form>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="small text-muted">Total: {users.length} users</div>
            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm" value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }} style={{ width: 90 }}>
                {perPageOptions.map(o => <option key={o} value={o}>{o}/page</option>)}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ width: 140 }}>Role</th>
                  <th style={{ width: 120 }}></th>
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">{loading ? 'Loading users...' : 'No users found'}</td>
                  </tr>
                )}
                {pageData.map((u, idx) => (
                  <tr key={u.id ?? idx}>
                    <td>{(page - 1) * perPage + idx + 1}</td>
                    <td className="d-flex align-items-center gap-3">
                      <div style={{ width: 40, height: 40 }} className="rounded-circle overflow-hidden bg-light d-flex align-items-center justify-content-center">
                        <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(asString(u.email ?? u.taiKhoan ?? u.id))}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="fw-bold">{getDisplayName(u)}</div>
                        <div className="small text-muted">ID: {u.id ?? '-'}</div>
                      </div>
                    </td>
                    <td>{asString(u.email ?? u.emailAddress) || '-'}</td>
                    <td>{roleBadge(asString(u.role ?? (u as UserItem & { roles?: unknown }).roles ?? (u as UserItem & { maLoaiNguoiDung?: unknown }).maLoaiNguoiDung) || undefined)}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-outline-primary">View</button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={deletingId === u.id}
                          onClick={() => handleDeleteUser(u)}
                        >
                          {deletingId === u.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="small text-muted">Showing {pageData.length} of {filtered.length} matched</div>
            <div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button></li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}><button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button></li>
                  ))}
                  <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Search Jobs (Server-side)</h4>
              <small className="text-muted">Search jobs via API: thue-cong-viec/phan-trang-tim-kiem</small>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <input value={jobKeyword} onChange={e => setJobKeyword(e.target.value)} className="form-control" placeholder="Keyword (e.g. linh)" style={{ minWidth: 220 }} />
              <select value={jobPageSize} onChange={e => setJobPageSize(Number(e.target.value))} className="form-select" style={{ width: 140 }}>
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
              <button className="btn btn-primary" onClick={async () => { await searchJobs(jobKeyword, 1, jobPageSize) }}>
                Search
              </button>
            </div>
          </div>

          <div>
            {jobLoading && <div>Searching jobs...</div>}
            {jobError && <div className="alert alert-danger">{jobError}</div>}

            {!jobLoading && jobResults.length > 0 && (
              <>
                <div className="small text-muted mb-2">Found: {jobTotal ?? jobResults.length} items</div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>#</th>
                        <th>Job Title</th>
                        <th style={{ width: 160 }}>Category</th>
                        <th style={{ width: 140 }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobResults.map((j, i) => (
                        <tr key={j.id ?? i}>
                          <td>{(jobPageIndex - 1) * jobPageSize + i + 1}</td>
                          <td className="fw-bold">{getJobTitle(j)}</td>
                          <td>{j.tenLoaiCongViec ?? j.congViec?.tenLoaiCongViec ?? '-'}</td>
                          <td>{asString(j.giaTien ?? (j as JobItem & { price?: unknown }).price) || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <nav>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${jobPageIndex <= 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => searchJobs(jobKeyword, Math.max(1, jobPageIndex - 1), jobPageSize)}>Prev</button></li>
                      <li className="page-item disabled"><span className="page-link">{jobPageIndex}</span></li>
                      <li className={`page-item ${jobTotal && jobPageIndex >= Math.ceil((jobTotal || 0) / jobPageSize) ? 'disabled' : ''}`}><button className="page-link" onClick={() => searchJobs(jobKeyword, jobPageIndex + 1, jobPageSize)}>Next</button></li>
                    </ul>
                  </nav>
                </div>
              </>
            )}

            {!jobLoading && jobResults.length === 0 && !jobError && <div className="text-muted">No job results yet. Use the search box above.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
