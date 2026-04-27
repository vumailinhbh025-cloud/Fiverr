import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '../redux/store'
import { getProfileApiActionThunk } from '../redux/reduces/UserReducer'

type Props = {
  children?: React.ReactNode
}

const Profile = (_props: Props) => {
  const { userProfile, userLogin} = useSelector((state: RootState) => state.UserReducer)
  const dispatch: Dispatch = useDispatch()
  useEffect(() => {
    if (userLogin?.id) {
    dispatch(getProfileApiActionThunk(userLogin.id))
  }
}, [dispatch, userLogin])
  return (
    <div className="container py-5">
      <div className="row gx-4">
        <div className="col-lg-3">
          <div className="card shadow-sm rounded-4 mb-4 border-0">
            <div className="card-body">
              <div className="position-relative text-center mb-4">
                <img src={userProfile?.avatar|| `https://i.pravatar.cc/150?u=${userProfile?.email}`} alt="Profile" className="rounded-circle" style={{ width: 120, height: 120, objectFit: 'cover' }} />
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success">Online</span>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <h4 className="mb-0">{userProfile?.name}</h4>
                <button type="button" className="btn btn-sm btn-outline-secondary rounded-circle p-2">
                  <i className="bi bi-pencil"></i>
                </button>
              </div>

              <ul className="list-unstyled text-muted small mb-4">
                <li className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-geo-alt-fill"></i> Vietnam</li>
                <li className="d-flex align-items-center gap-2"><i className="bi bi-calendar-event-fill"></i> Member since May 2021</li>
              </ul>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Description</h6>
                  <button type="button" className="btn btn-sm btn-link">Edit Description</button>
                </div>
                <p className="text-muted">I am a front-end developer with experience in building responsive websites using React, HTML, CSS and JavaScript.</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Languages</h6>
                  <button type="button" className="btn btn-sm btn-link">Add New</button>
                </div>
                <p className="mb-0 text-muted">English — Basic</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Linked Accounts</h6>
                  <button type="button" className="btn btn-sm btn-link">Add New</button>
                </div>
                <ul className="list-unstyled text-muted small mb-0">
                  {['Facebook', 'Google', 'Dribbble', 'Stack Overflow', 'GitHub', 'Vimeo', 'Twitter'].map((item) => (
                    <li key={item} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Skills</h6>
                  <button type="button" className="btn btn-sm btn-link">Add New</button>
                </div>
                <p className="text-muted mb-0">Add your Skills.</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Education</h6>
                  <button type="button" className="btn btn-sm btn-link">Add New</button>
                </div>
                <p className="text-muted mb-0">Add your Education.</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Certification</h6>
                  <button type="button" className="btn btn-sm btn-link">Add New</button>
                </div>
                <p className="text-muted mb-0">Add your Certification.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card shadow-sm rounded-4 border-0 mb-4">
            <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-info-circle-fill fs-3 text-primary"></i>
                <div>
                  <p className="mb-1"><strong>Buying services for work?</strong> Help us tailor your experience to fit your needs.</p>
                  <button type="button" className="btn btn-link p-0">Tell us about your business</button>
                </div>
              </div>
              <button type="button" className="btn btn-success">Create a New Gig</button>
            </div>
          </div>

          <div className="card shadow-sm rounded-4 border-0 mb-3">
            <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div>
                <p className="mb-1 text-muted">It seems that you don't have any active Gigs. Get selling!</p>
              </div>
              <button type="button" className="btn btn-success">Create a New Gig</button>
            </div>
          </div>

          {[1, 2].map((item) => (
            <div key={item} className="card shadow-sm rounded-4 border-0 mb-3">
              <div className="row g-0 align-items-center">
                <div className="col-md-4">
                  <img src={`https://picsum.photos/seed/profile-${item}/420/240`} alt="Gig" className="img-fluid rounded-start-4 w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h5 className="mb-1">Lập trình front end với react js</h5>
                        <div className="text-warning">
                          {[...Array(5)].map((_, index) => (
                            <i key={index} className="bi bi-star-fill"></i>
                          ))}
                          <span className="ms-2 text-muted">4.3</span>
                        </div>
                      </div>
                      <div className="text-end text-muted">$250</div>
                    </div>
                    <p className="text-muted mb-3">Của một công ty phát triển phần mềm chuyên nghiệp. Tôi sẽ thiết kế giao diện HTML/CSS/JavaScript chuẩn SEO và responsive.</p>
                    <div className="d-flex flex-wrap gap-2">
                      <button type="button" className="btn btn-sm btn-outline-primary">View detail</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      <button type="button" className="btn btn-sm btn-outline-danger">X</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
