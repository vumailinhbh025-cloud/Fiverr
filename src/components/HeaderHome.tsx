
import { NavLink } from "react-router-dom"
import type { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { ACCESSTOKEN, removeCookie, removeStore, USERLOGIN } from "../util/config"


const HeaderHome = () => {
  const { userLogin } = useSelector((state: RootState) => state.UseReducer)
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
        <div className="d-flex align-items-center gap-2">
        <NavLink className="text-white text-decoration-none d-flex align-items-center" to="/profile">
          <div className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '50px', height: '50px' }}>
            <i className="fa fa-user fs-3 pb-1"></i>
          </div>
        </NavLink>
        
        <button className="btn btn-outline-light fw-bold ms-1" onClick={logout} style={{ fontSize: '18px', borderRadius: '4px' }}>
          Logout
        </button>
      </div>
      );
    }
    return <div className="d-flex align-items-center gap-3">
      <NavLink className="text-white text-decoration-none fw-semibold fs-5" to="/register">
        Sign In
      </NavLink>
      <NavLink className="btn btn-outline-light rounded-pill px-4 fw-bold fs-5" to="/login" style={{ transition: 'all 0.3s' }}>
        Login
      </NavLink>
    </div>
  }
  return (
    <nav className="navbar navbar-expand-lg py-3" style={{ background: 'linear-gradient(90deg, #b32c1a 0%, #97220f 100%)' }}>
      <div className="container">
        <NavLink className="navbar-brand text-white fw-bold fs-1" to="">
          fiverr<span className=" text-success">
            <i className="fa fa-at" style={{ fontSize: 8 }} />
          </span>
        </NavLink>

        <div className="d-flex align-items-center gap-4">
        <div className="text-white text-decoration-none fw-semibold d-none d-md-block m-0 fs-5" style={{ fontSize: '16px' }}>
          Become a Seller
        </div>
        {renderLogin()}
      </div>
      </div>
    </nav>
  )
}

export default HeaderHome