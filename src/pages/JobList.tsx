import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '../redux/store'
import { getAllJobApiActionThunk } from '../redux/reduces/Job'
import type { JobModel } from '../ViewModel/JobModel'
import { Pagination, ConfigProvider } from 'antd'
import { NavLink } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const JobList = (_props: Props) => {
  const { arrJob } = useSelector((state: RootState) => state.Job)
  const dispatch: Dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentJobs = arrJob.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const getAllJobApi = async () => {
    dispatch(getAllJobApiActionThunk())
  }
  useEffect(() => {
    getAllJobApi()
  }, [])
  return (
    <div className="container pb-3 bg-light">
      <div className="row g-4 justify-content-center">
        {currentJobs.map((job: JobModel, index: number) => {
          return <NavLink to={`detail/${job.id}`} className="job-card col-12 col-md-6 col-lg-4 col-xl-3 text-decoration-none " key={index}>
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
                <h3 className="job-title card-text mb-3 fw-bold " style={{ fontSize: '18px', overflow: 'hidden'}}>
                  {job.tenCongViec}
                </h3>
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
          </NavLink>
        })}

      </div>

      <div className="mt-3 d-flex justify-content-center">
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemSize: 45,
                fontSize: 20,        
                borderRadius: 8,     
              },
            },
          }}
        >
          <Pagination 
          current={currentPage}
          pageSize={pageSize}
          total={arrJob.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default JobList