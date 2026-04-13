const Carousel = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4">
          <div>
            <h2 className="display-6 fw-bold mb-2">Popular professional services</h2>
            <p className="fs-5 text-muted mb-0">Explore top-rated freelancers ready to help you grow.</p>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <button className="btn btn-white border rounded-circle shadow-sm p-2" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn btn-white border rounded-circle shadow-sm p-2" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div id="serviceCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row gx-4 gy-4 justify-content-center">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="Logo Design"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Build your brand</div>
                      <h5 className="card-title fw-bold mb-0">Logo Design</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="WordPress"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Customize your site</div>
                      <h5 className="card-title fw-bold mb-0">WordPress</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="Voice Over"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Share your message</div>
                      <h5 className="card-title fw-bold mb-0">Voice Over</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="Video Explainer"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Engage your audience</div>
                      <h5 className="card-title fw-bold mb-0">Video Explainer</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row gx-4 gy-4 justify-content-center">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://media-blog.jobsgo.vn/blog/wp-content/uploads/2025/11/social-media-la-gi-image-1.jpg"
                      className="card-img"
                      alt="Social Media"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Reach more customers</div>
                      <h5 className="card-title fw-bold mb-0">Social Media</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="Logo Design"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Build your brand</div>
                      <h5 className="card-title fw-bold mb-0">Logo Design</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="WordPress"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Customize your site</div>
                      <h5 className="card-title fw-bold mb-0">WordPress</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 text-white">
                    <img
                      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                      className="card-img"
                      alt="Voice Over"
                      style={{ height: '340px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.72) 100%)' }}>
                      <div className="small text-white-50 mb-1 fs-5">Share your message</div>
                      <h5 className="card-title fw-bold mb-0">Voice Over</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousel