
import { NavLink } from "react-router-dom"


const HeaderHome = () => {
  const renderLogin = () => {
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