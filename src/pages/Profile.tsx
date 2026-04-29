import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '../redux/store'
import { getProfileApiActionThunk } from '../redux/reduces/UserReducer'
import { changeContentModalAction } from '../redux/reduces/ModalHOCReducer'
import UpdateThongTin from './UpdateThongTin'
import { getJobThueApiActionThunk } from '../redux/reduces/Job'
import type { JobThueModel } from '../ViewModel/JobThueModel'
import { NavLink } from 'react-router-dom'



type Props = {
  children?: React.ReactNode
}

const Profile = (_props: Props) => {
  const { userProfile, userLogin } = useSelector((state: RootState) => state.UserReducer)
  const { arrJobThue } = useSelector((state: RootState) => state.Job)
  const dispatch: Dispatch = useDispatch()
  useEffect(() => {
    if (userLogin?.id) {
      dispatch(getProfileApiActionThunk(userLogin.id))
      dispatch(getJobThueApiActionThunk())
    }
  }, [dispatch, userLogin])
  return (
    <div className="container py-5">
      <div className="row gx-4">
        <div className="col-lg-3">
          <div className="card shadow-sm rounded-4 mb-4 border-0">
            <div className="card-body">
              <div className="position-relative text-center mb-4">
                <img src={userProfile?.avatar || `https://i.pravatar.cc/150?u=${userProfile?.email}`} alt="Profile" className="rounded-circle" style={{ width: 120, height: 120, objectFit: 'cover' }} />
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success">Online</span>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <h4 className="mb-0">{userProfile?.name}</h4>
                <button type="button" className="btn btn-sm btn-outline-secondary rounded-circle p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                  const action = changeContentModalAction({
                    title: 'Cập nhật thông tin cá nhân',
                    contentComponent: <UpdateThongTin />
                  })
                  dispatch(action)
                }}>
                  <i className="bi bi-pencil"></i>
                </button>
              </div>

              <ul className="list-unstyled text-muted small mb-4">
                <li className="d-flex align-items-center gap-2 mb-2"><i className="fa fa-neuter"></i>{userProfile?.gender ? 'Nam' : 'Nữ'}</li>
                <li className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-envelope-fill"></i> {userProfile?.email}</li>
                <li className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-telephone-fill"></i> {userProfile?.phone}</li>
                <li className="d-flex align-items-center gap-2"><i className="bi bi-calendar-event-fill"></i> {userProfile?.birthday}</li>
              </ul>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Description</h6>
                </div>
                <p className="text-muted">{userProfile?.role}</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Skills</h6>
                </div>
                <p className="text-muted mb-3">{Array.isArray(userProfile?.skill)
                  ? userProfile.skill.join(', ')
                  : userProfile?.skill}</p>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Certification</h6>
                </div>
                <p className="text-muted mb-0">{Array.isArray(userProfile?.certification)
                  ? userProfile.certification.join(', ')
                  : userProfile?.certification}</p>
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

          {arrJobThue.length > 0 ? (
            arrJobThue.map((item: JobThueModel, index: number) => (
              <div key={index} className="card shadow-sm rounded-4 border-0 mb-3 overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="Job" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0 text-primary">Dịch vụ mã số #{item.maCongViec}</h5>
                        <span className={`badge rounded-pill ${item.hoanThanh ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-warning border border-warning'}`}>
                          <i className={`bi ${item.hoanThanh ? 'bi-check-circle-fill' : 'bi-clock-history'} me-1`}></i>
                          {item.hoanThanh ? 'Đã hoàn thành' : 'Đang thực hiện'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top pt-2">
                        <span className="text-muted small">ID đơn: <span className="fw-medium">#{item.id}</span></span>
                        <div className="d-flex gap-2">
                          <NavLink to={`/danhSachCongViec/detail/${item.maCongViec}`} className="btn btn-sm btn-outline-primary px-3">Chi tiết</NavLink>
                          <button className="btn btn-sm btn-danger px-3">Hủy đơn</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card shadow-sm rounded-4 border-0 mb-3 p-5 text-center">
              <div className="card-body">
                <div className="mb-4">
                  <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
                <h5 className="fw-bold">Bạn chưa thuê công việc nào cả</h5>
                <p className="text-muted">Hãy khám phá các dịch vụ tuyệt vời của chúng tôi ngay hôm nay!</p>
                <NavLink to="/danhSachCongViec" className="btn btn-success rounded-pill px-4 mt-2">
                  Khám phá dịch vụ ngay
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
