import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '../redux/store'
import { getAllJobApiActionThunk } from '../redux/reduces/Job'
import type { JobModel } from '../ViewModel/JobModel'

type Props = {
  children?: React.ReactNode
}

const JobList = (_props: Props) => {
  const { arrJob } = useSelector((state: RootState) => state.Job)
  const dispatch: Dispatch = useDispatch()
  const getAllJobApi = async () => {
    dispatch(getAllJobApiActionThunk())
  }
  useEffect(() => {
    getAllJobApi()
  }, [])
  return (
    <div className="container py-5 bg-light">
      <div className="row g-4 justify-content-center">
        {arrJob.map((job: JobModel, index: number) => {
          return <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
            <div className="card h-100 shadow-sm bg-white border-0" style={{ border: '1px solid #e4e5e7', borderRadius: '8px', overflow: 'hidden' }}>
              <div className="border-bottom text-center bg-white">
                <img
                  src={job.hinhAnh}
                  className="card-img-top"
                  style={{ height: '270px', maxWidth: '100%', objectFit: 'cover' }}
                  alt="job"
                />
              </div>
              <div className="card-body p-4">
                <h3 className="card-text mb-3 fw-bold" style={{ fontSize: '18px', overflow: 'hidden', color: '#404145', }}>
                  {job.tenCongViec}
                </h3>
                <p style={{ fontSize: 18 }}>{job.moTaNgan}</p>
                <div className="d-flex align-items-center">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <i
                        className="bi bi-star-fill me-1"
                        style={{ color: index < job.saoCongViec ? '#ffbe5b' : '#e4e5e7', fontSize: '18px' }}
                        key={index}
                      />
                    )
                  })}
                  <span style={{ fontWeight: '700', color: '#ffbe5b', fontSize: '20px' }}>{job.danhGia}</span>
                  <span className="ms-1 text-muted" style={{ fontSize: '20px' }}>({job.nguoiTao})</span>
                </div>
              </div>
              <div className="card-footer bg-white border-top px-4 d-flex justify-content-between align-items-center">
                <i className="bi bi-heart-fill" style={{ fontSize: '22px', color: '#ff4d4f' }} />
                <div className="text-end">
                  <div className="text-uppercase text-muted" style={{ fontSize: '15px', fontWeight: '800' }}>Starting at</div>
                  <div className="fw-bold" style={{ fontSize: '20px' }}>${job.giaTien}</div>
                </div>
              </div>
            </div>
          </div>
        })}

      </div>
    </div>

  )
}

export default JobList