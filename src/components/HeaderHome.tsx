

const HeaderHome = () => {
  return (
    <nav className="navbar navbar-expand-lg py-3" style={{ background: 'linear-gradient(90deg, #b32c1a 0%, #97220f 100%)' }}>
      <div className="container">
        <a className="navbar-brand text-white fw-bold fs-1" href="#">
          fiverr<span className=" text-success">
            <i className="fa fa-at"  style={{fontSize: 8}}/>
                </span>
        </a>

        <div className="d-flex align-items-center gap-3">
          <button type="button" className="fs-5 btn btn-link text-white text-decoration-none">
            Become a Seller
          </button>
          <button type="button" className="fs-5 btn btn-link text-white text-decoration-none">
            Sign In
          </button>
          <button type="button" className=" fs-5 btn btn-light rounded-pill px-4">
            Join
          </button>
        </div>
      </div>
    </nav>
  )
}

export default HeaderHome