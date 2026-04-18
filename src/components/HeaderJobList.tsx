import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

type Props = {
    children?: React.ReactNode
}

const HeaderJobList = (_props: Props) => {
  const [keyword,setKeyword] = useState('');
  const navigate = useNavigate()
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/danhSachCongViec/search?tenCongViec=${keyword}`);
    }else{
      navigate(`/danhSachCongViec`)
    }
  }
  return (
    <header className="border-bottom bg-white shadow-sm">
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <NavLink className="navbar-brand fw-bold fs-2 text-dark" to="/">
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
                aria-describedby="search-addon" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                  setKeyword(e.target.value)
                }}
              />
              <button className="btn btn-dark rounded-pill px-4" type="submit">
                Search
              </button>
            </div>
            
          </form>

          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
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
            <button type="button" className="btn btn-link text-decoration-none text-muted">
              Sign in
            </button>
            <button type="button" className="btn btn-success rounded-pill px-4">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="pb-4 bg-white">
        <div className="container">
          <div className="d-flex align-items-center gap-4 overflow-hidden small">
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Graphics & Design
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Digital Marketing
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Writing & Translation
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Video & Animation
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Music & Audio
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Programming & Tech
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Business
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Lifestyle
            </button>
            <button type="button" className="btn btn-outline-secondary btn-md rounded-pill text-nowrap">
              Trending
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderJobList