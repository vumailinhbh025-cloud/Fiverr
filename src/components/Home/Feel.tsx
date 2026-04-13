

const Feel = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#f4fbf8' }}>
      <div className="container">
        <div className="talk row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="display-6 fw-bold mb-4">
              A whole world of freelance talent at your fingertips
            </h2>
            <p className="fs-5 text-muted mb-4">
              Find high-quality services at every price point. No hourly rates, just project-based pricing.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-12">
                <div className="d-flex gap-3 p-3 rounded-4 bg-white shadow-sm border">
                  <div className="text-success fs-4 mt-1">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fs-5">The best for every budget</h6>
                    <p className="mb-0 text-muted">Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-3 p-3 rounded-4 bg-white shadow-sm border">
                  <div className="text-success fs-4 mt-1">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fs-5">Quality work done quickly</h6>
                    <p className="mb-0 text-muted">Find the right freelancer to begin working on your project within minutes.</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-3 p-3 rounded-4 bg-white shadow-sm border">
                  <div className="text-success fs-4 mt-1">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fs-5">Protected payments, every time</h6>
                    <p className="mb-0 text-muted">Always know what you’ll pay upfront. Your payment isn’t released until you approve the work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative rounded-4 overflow-hidden shadow-sm">
              <img
                src="https://khangphuc.vn/storage/5f82c6a23930313864287540/images/TTTH/ttth%203/9-cau-hoi-1.jpeg"
                alt="Freelance team"
                className="w-100 h-100"
                style={{ objectFit: 'cover', minHeight: '500px' }}
              />
            </div>
          </div>
        </div>

        <div className="row align-items-center gy-4 mt-5">
          <div className="col-lg-6">
            <div id="talkCarousel" className="carousel slide rounded-4 overflow-hidden shadow-sm" data-bs-ride="carousel">
              <div className="carousel-inner" style={{ minHeight: '320px' }}>
                <div className="carousel-item active">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                    className="d-block w-100"
                    alt="Happy clients"
                    style={{ height: '380px', objectFit: 'cover' }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://english4u.com.vn/Uploads/images/conversation-course-thumb.jpg"
                    className="d-block w-100"
                    alt="Team conversation"
                    style={{ height: '380px', objectFit: 'cover' }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://upload.tanca.io/api/upload/news/6635ed8a8ba20a097b0ac6ac?name=6635ed8acab90uxNv7129333-bat-dau-tro-chuyen-1.jpg"
                    className="d-block w-100"
                    alt="Freelancer review"
                    style={{ height: '380px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#talkCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#talkCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="rounded-4 bg-white shadow-sm border p-5 h-100">
              <div className="mb-3 text-secondary text-uppercase" style={{fontSize: 18}}>Kay Kim, Co-Founder <span className="text-dark fw-semibold">| rooted</span></div>
              <p className="fs-5 fst-italic text-dark mb-4">
                “It’s extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we’re sleeping, someone’s working.”
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-light border" style={{ width: 90, height: 90 }}>
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Kay Kim"
                    className="rounded-circle"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h6 className="mb-2 fs-5">Kay Kim</h6>
                  <p className="mb-0 text-muted" style={{fontSize: 18}}>Co-Founder, rooted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feel