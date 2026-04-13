const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="row g-5 justify-content-between">
            <div className="col-6 col-md-2 mb-4">
              <h5 className="text-uppercase fw-semibold mb-3">Categories</h5>
              <ul className="list-unstyled lh-lg mb-0">
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Graphics & Design</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Digital Marketing</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Writing & Translation</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Video & Animation</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Music & Audio</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Programming & Tech</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Data</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Business</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Lifestyle</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Sitemap</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-4">
              <h5 className="text-uppercase fw-semibold mb-3">About</h5>
              <ul className="list-unstyled lh-lg mb-0">
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Careers</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Press & News</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Partnerships</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Intellectual Property Claims</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Investor Relations</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-4">
              <h5 className="text-uppercase fw-semibold mb-3">Support</h5>
              <ul className="list-unstyled lh-lg mb-0">
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Help & Support</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Trust & Safety</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Selling on Fiverr</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Buying on Fiverr</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-4">
              <h5 className="text-uppercase fw-semibold mb-3">Community</h5>
              <ul className="list-unstyled lh-lg mb-0">
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Events</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Forum</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Community Standards</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Podcast</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Affiliates</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Invite a Friend</a></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-4">
              <h5 className="text-uppercase fw-semibold mb-3">More From Fiverr</h5>
              <ul className="list-unstyled lh-lg mb-0">
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Fiverr Business</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Fiverr Pro</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Fiverr Studios</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Fiverr Logo Maker</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Fiverr Guides</a></li>
                <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Get Inspired</a></li>
                <li><a href="#" className="text-dark text-decoration-none">ClearVoice</a></li>
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-muted gap-4">
            <div className="d-flex align-items-center gap-3 mb-4 mb-md-0">
              <span className="fw-bold fs-2">fiverr</span>
              <span style={{fontSize: 15}}>© Fiverr International Ltd. 2021</span>
            </div>
            <div className="d-flex flex-row flex-wrap align-items-center justify-content-center gap-3">
              <div className="d-flex align-items-center gap-4">
                <a href="#" className=" d-inline-flex justify-content-center align-items-center border rounded-circle text-dark text-decoration-none" style={{ width: '34px', height: '34px' }}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="d-inline-flex justify-content-center align-items-center border rounded-circle text-dark text-decoration-none" style={{ width: '34px', height: '34px' }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="d-inline-flex justify-content-center align-items-center border rounded-circle text-dark text-decoration-none" style={{ width: '34px', height: '34px' }}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="d-inline-flex justify-content-center align-items-center border rounded-circle text-dark text-decoration-none" style={{ width: '34px', height: '34px' }}>
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#" className="d-inline-flex justify-content-center align-items-center border rounded-circle text-dark text-decoration-none" style={{ width: '34px', height: '34px' }}>
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="d-flex align-items-center gap-4">
                <span className="d-flex align-items-center gap-1">
                  <i className="fas fa-globe"></i>
                  English
                </span>
                <span className="border rounded-pill px-3 py-1">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer