import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import type { Dispatch, RootState } from '../redux/store'
import { getMenuJobApiActionThunk } from '../redux/reduces/MenuJobReducer'
import type { MenuJobItem } from '../ViewModel/MenuJob'
import { ACCESSTOKEN, removeCookie, removeStore, USERLOGIN } from '../util/config'

type Props = {
  children?: React.ReactNode
}

const HeaderJobList = (_props: Props) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate()
  const { arrMenu } = useSelector((state: RootState) => state.MenuJobReducer)
  const dispatch: Dispatch = useDispatch()
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/danhSachCongViec/search?tenCongViec=${keyword}`);
    } else {
      navigate(`/danhSachCongViec`)
    }
  }
  const { userLogin } = useSelector((state: RootState) => state.UserReducer)
  const logout = () => {
    removeStore(ACCESSTOKEN)
    removeStore(USERLOGIN)
    removeCookie(ACCESSTOKEN)
    removeCookie(USERLOGIN)
    window.location.href = '/login';
  }
  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex align-items-center gap-3">
          <NavLink className="text-decoration-none d-flex align-items-center" to="/danhSachCongViec/profile">
            <div className="btn btn-light d-flex align-items-center justify-content-center rounded-circle shadow-sm transition" style={{ width: '44px', height: '44px', cursor: 'pointer', overflow: 'hidden', padding: 0 }}>
              <img 
                src={`https://i.pravatar.cc/150?u=${userLogin.email}`} 
                alt="avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </NavLink>

          <button 
            className="btn btn-outline-danger rounded-pill px-4 fw-600 transition" 
            onClick={logout}
            style={{ fontSize: '14px', fontWeight: '600', border: '2px solid' }}
          >
            <i className="fa fa-sign-out me-2"></i>Logout
          </button>
        </div>
      );
    }
    return (
      <div className="d-flex align-items-center gap-2">
        <NavLink to='/register' className="btn btn-outline-secondary rounded-pill px-4 fw-600 text-decoration-none transition" style={{ fontSize: '14px', fontWeight: '600' }}>
          <i className="fa fa-user-plus me-2"></i>Sign Up
        </NavLink>
        <NavLink to='/login' className="btn btn-success rounded-pill px-4 fw-600 text-decoration-none transition shadow-sm" style={{ fontSize: '14px', fontWeight: '600' }}>
          <i className="fa fa-sign-in me-2"></i>Login
        </NavLink>
      </div>
    )
  }
  useEffect(() => {
    const action = getMenuJobApiActionThunk()
    dispatch(action)
  }, [])
  return (
    <header className="border-bottom bg-white shadow-sm">
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <NavLink className="navbar-brand fw-bold fs-2 text-dark" to="/danhSachCongViec">
            fiverr
            <span className="text-success" style={{ fontSize: 8 }}>
              <i className="fa fa-at" />
            </span>
          </NavLink>

          <form onSubmit={handleSubmit} className="flex-grow-1 mx-3" style={{ minWidth: 320, maxWidth: 680 }}>
            <div className="input-group shadow-sm rounded-pill border overflow-hidden bg-white">
              <span className="input-group-text bg-white border-0 px-3" id="search-addon">
                <i className="fa fa-search text-secondary" />
              </span>
              <input
                type="search"
                className="form-control border-0 px-3"
                placeholder="What service are you looking for today?"
                aria-label="Search services"
                aria-describedby="search-addon" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setKeyword(e.target.value)
                }}
              />
              <button className="btn btn-dark rounded-pill px-4" type="submit">
                Search
              </button>
            </div>

          </form>

          <div className={`d-flex align-items-center gap-2 flex-wrap ${userLogin ? 'justify-content-end' : 'justify-content-center'}`}>
            {userLogin && (
              <>
                <button type="button" className="btn btn-link text-decoration-none text-muted">
                  Fiverr Business
                </button>
                <button type="button" className="btn btn-link text-decoration-none text-muted">
                  Explore
                </button>
                <button type="button" className="btn btn-link text-decoration-none text-muted">
                  English
                </button>
                <button type="button" className="btn btn-link text-decoration-none text-muted">
                  US$ USD
                </button>
                <button type="button" className="btn btn-link text-decoration-none text-muted">
                  Become a Seller
                </button>
              </>
            )}
            {renderLogin()}
          </div>
        </div>
      </div>

      <div className="pb-4 bg-white">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-4">
            {arrMenu.map((congViec: MenuJobItem, index: number) => {
              return (
                <div
                  className="dropdown hover-dropdown position-relative" onMouseEnter={() => {
                    if (congViec.dsNhomChiTietLoai.length > 0) {
                      setActiveMenu(congViec.id);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                  }}
                  key={index}>
                  <button
                    className="btn btn-outline-success btn-md rounded-pill text-nowrap"
                    type="button">
                    {congViec.tenLoaiCongViec}
                  </button>

                  {activeMenu === congViec.id && (
                    <div className="mega-menu shadow rounded p-4">
                      <div className="row">
                        {congViec.dsNhomChiTietLoai.map((nhom) => (
                          <div className="col-6" key={nhom.id}>
                            <h5 className="fw-bold">
                              {nhom.tenNhom}
                            </h5>

                            {nhom.dsChiTietLoai.map((chiTiet) => (
                              <NavLink to={`detail/${chiTiet.id}`}
                                key={chiTiet.id}
                                className="detail-link mb-2 d-block text-decoration-none"
                                style={{ cursor: "pointer" }}>
                                {chiTiet.tenChiTiet}
                              </NavLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderJobList