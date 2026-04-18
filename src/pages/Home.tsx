import React from 'react'
import Carousel from '../components/Home/Carousel'
import Feel from '../components/Home/Feel'
import Explore from '../components/Home/Explore'
import { NavLink } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const Home = (_props: Props) => {
  return (
    <>
      <section
        className="home-hero"
        style={{
          background: 'linear-gradient(90deg, #a7260f 0%, #7f1f0d 55%, #4b1209 100%)'
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center gx-5">
            <div className="col-lg-6 text-white">
              <h1 className="display-5 fw-bold mb-4">
                Find the perfect <span className="fst-italic">freelance</span>
                <br /> services for your business
              </h1>

              <form className="row g-2 align-items-center mb-4">
                <div className="col-sm">
                  <div className="input-group input-group-lg rounded-pill overflow-hidden shadow-sm bg-white">
                    <span className="input-group-text bg-white border-0 text-secondary">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                      className="form-control border-0"
                      type="search"
                      placeholder='Try "building mobile app"'
                      aria-label="Search"
                    />
                  </div>
                </div>
                <div className="col-sm-auto">
                  <button type="submit" className=" fs-5 btn btn-success btn-lg rounded-pill px-4">
                    Search
                  </button>
                </div>
              </form>
              
              <div className="d-flex flex-wrap align-items-center gap-2 small text-white-75">
                <span className="me-2 fs-5">Popular:</span>
                <button type="button" className="btn btn-outline-light btn-sm rounded-pill py-2 px-3" style={{ fontSize: 15 }}>
                  Website Design
                </button>
                <button type="button" className="btn btn-outline-light btn-sm rounded-pill py-2 px-3" style={{ fontSize: 15 }}>
                  WordPress
                </button>
                <button type="button" className="btn btn-outline-light btn-sm rounded-pill py-2 px-3" style={{ fontSize: 15 }}>
                  Logo Design
                </button>
                <button type="button" className="btn btn-outline-light btn-sm rounded-pill py-2 px-3" style={{ fontSize: 15 }}>
                  Dropshipping
                </button>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="rounded-4 position-relative">
                <img
                  src="https://png.pngtree.com/png-clipart/20240317/original/pngtree-portrait-of-beautiful-young-african-american-businesswoman-isolated-on-white-background-png-image_14609348.png"
                  alt="Business woman"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', minHeight: '640px' }}
                />
                <div className="position-absolute bottom-0 end-0 m-4 p-3 rounded-4 bg-light shadow-sm text-end" style={{ maxWidth: '220px' }}>
                  <div className="d-flex justify-content-end gap-1 text-warning mb-2">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="fw-semibold text-dark">Gabrielle, Video Editor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section my-4">
        <div className="d-flex justify-content-center">
              <NavLink 
                to='/danhSachCongViec' 
                className="btn btn-outline-success px-5 py-4 rounded fs-2 fw-bold"
              >
                Start Now <i className="fa-solid fa-arrow-right ms-1"></i>
              </NavLink>
            </div>
      </section>
      <Carousel />
      <Feel/>
      <Explore/>
      
    </>
  )
}

export default Home