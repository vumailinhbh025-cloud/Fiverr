import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '../redux/store'
import { getBinhLuanCongViec, getJobDetailActionThunk, postBinhLuan, thueJob } from '../redux/reduces/DetailReducer'
import { useParams } from 'react-router-dom'
import type { BinhLuan, nguoiBinhLuan } from '../ViewModel/BinhLuanModel'

type Props = {
  children?: React.ReactNode
}

const Detail = (_props: Props) => {
  const { jobDetail, binhLuanJob } = useSelector((state: RootState) => state.DetailReducer)
  const dispatch: Dispatch = useDispatch()
  const [commentsToShow, setCommentsToShow] = useState(3)
  const [comment, setComment] = useState("")
  const handleLoadMore = () => {
    setCommentsToShow(prev => prev + 3)
  }

  const handleCollapse = () => {
    setCommentsToShow(prev => Math.max(3, prev - 3))
  }
  const params = useParams()
  useEffect(() => {
    const id = Number(params.id)
    dispatch(getJobDetailActionThunk(id))
    dispatch(getBinhLuanCongViec(id))
  }, [params.id, dispatch]);
  const handleAddComment = () => {
    if (!comment.trim()) {
      alert("Vui lòng nhập bình luận")
      return
    }
    const data = {
      maCongViec: Number(params.id),
      noiDung: comment,
      saoBinhLuan: 5
    } as nguoiBinhLuan
    dispatch(postBinhLuan(data, Number(params.id)))
    setComment("")
    setCommentsToShow(prev => prev + 1)
  }
  if (!jobDetail) {
    return <div className="container py-5 text-center">Đang tải dữ liệu...</div>;
  }
  return (
    
    <div className="container pb-5">
      <div className="row g-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={jobDetail?.avatar || `https://i.pravatar.cc/150?u=${jobDetail?.id}`}
                  alt="Seller avatar"
                  className="rounded-circle border"
                  width="48"
                  height="48"
                />
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold">{jobDetail.tenNguoiTao} </span>
                    <span className="badge bg-dark text-white">{jobDetail.tenChiTietLoai}</span>
                  </div>
                  <div className="text-warning">
                    {[...Array(5)].map((_, index) => {
                      return (
                        <i
                          className="bi bi-star-fill me-1"
                          style={{ color: index < jobDetail?.congViec.saoCongViec ? '#ffbe5b' : '#e4e5e7', fontSize: '18px' }}
                          key={index}
                        />
                      )
                    })}
                    <span className="ms-2 text-muted">{jobDetail.congViec.saoCongViec} ({jobDetail.congViec.danhGia})</span>
                  </div>
                </div>
              </div>
              <p className="display-6 fw-bold">{jobDetail.congViec.tenCongViec}</p>
            </div>

            <div className="text-md-end">
              <div className="badge bg-success text-white py-2 px-3 mb-2">Top Rated Seller</div>
              <div className="text-muted">Delivery in <strong>30 Days</strong></div>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3 text-muted">
            <span className="badge bg-primary text-white">4.9</span>
            <span>{jobDetail.congViec.danhGia} reviews</span>
            <span>Response time 1 hour</span>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="position-relative" style={{ minHeight: 330 }}>
              <img
                src={jobDetail.congViec.hinhAnh}
                alt="Gig preview"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h5>About this gig</h5>
              <p className="text-muted">{jobDetail.congViec.moTa}</p>
              <h3 className="h6 mb-3">What you will get</h3>
              <ul className="list-unstyled">
                {[
                  'Custom CSS/HTML cho giao diện đẹp và chuẩn bố cục',
                  'JavaScript/jQuery tương tác và animation nhẹ',
                  'PHP xử lý form, gửi mail hoặc tích hợp API cơ bản',
                  'Responsive layout và cấu trúc thân thiện SEO',
                  'Hỗ trợ 1 lần sửa đổi và bàn giao mã sạch'
                ].map((point, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="bi bi-check2-circle text-success me-2"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 56, height: 56, minWidth: 56 }}>
                  <img src={jobDetail?.avatar || `https://i.pravatar.cc/150?u=${jobDetail?.id}`} alt={jobDetail.tenNguoiTao} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 className="h6 mb-1">{jobDetail.tenNguoiTao || `Nguyễn Văn A`}</h4>
                  <p className="text-muted mb-0">{jobDetail.tenChiTietLoai} • 5 years experience</p>
                </div>
              </div>
              <p className="text-muted">Chuyên phát triển front-end và full-stack với HTML, CSS, JavaScript và PHP. Sẵn sàng hỗ trợ bản demo và cải tiến theo yêu cầu của bạn.</p>
              <div className="d-flex flex-column gap-2 text-muted">
                <small><strong>Response:</strong> 1 hour</small>
                <small><strong>Orders:</strong> 420+</small>
                <small><strong>Languages:</strong> English, Vietnamese</small>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body">
              <h3 className="h5 mb-3">FAQ</h3>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqHeadingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseOne" aria-expanded="false" aria-controls="faqCollapseOne">
                      Do you provide regular updates on order?
                    </button>
                  </h2>
                  <div id="faqCollapseOne" className="accordion-collapse collapse" aria-labelledby="faqHeadingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Yes, I keep you updated during every step of the project until delivery.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqHeadingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseTwo" aria-expanded="false" aria-controls="faqCollapseTwo">
                      How do you guarantee product quality and reliability?
                    </button>
                  </h2>
                  <div id="faqCollapseTwo" className="accordion-collapse collapse" aria-labelledby="faqHeadingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      I follow best practices, test thoroughly, and deliver clean, maintainable code.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqHeadingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseThree" aria-expanded="false" aria-controls="faqCollapseThree">
                      Do you give post-development support?
                    </button>
                  </h2>
                  <div id="faqCollapseThree" className="accordion-collapse collapse" aria-labelledby="faqHeadingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Yes, I provide support after delivery and I can help fix issues if needed.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqHeadingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseFour" aria-expanded="false" aria-controls="faqCollapseFour">
                      Do you convert PSD to HTML?
                    </button>
                  </h2>
                  <div id="faqCollapseFour" className="accordion-collapse collapse" aria-labelledby="faqHeadingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Absolutely — I can convert PSD, Figma, or design files into pixel-perfect HTML/CSS.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
                <div>
                  <h3 className="h5 mb-1">335 Reviews</h3>
                  <div className="text-warning d-flex align-items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <i key={idx} className="bi bi-star-fill"></i>
                    ))}
                    <span className="fw-semibold">5</span>
                  </div>
                </div>
                <div className="text-muted">Sort By <strong>Most relevant</strong></div>
              </div>

              <div className="row gx-3 gy-3 mb-4">
                <div className="col-md-7">
                  <div className="mb-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="d-flex align-items-center mb-2">
                        <div className="text-muted text-nowrap" style={{ minWidth: 70, marginRight: '0.75rem' }}>{star} Stars</div>
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <div className="progress" style={{ height: '10px' }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: star === 5 ? '94%' : star === 4 ? '6%' : '0%' }} aria-valuenow={star === 5 ? 94 : star === 4 ? 6 : 0} aria-valuemin={0} aria-valuemax={100}></div>
                          </div>
                        </div>
                        <div className="text-muted text-end" style={{ minWidth: 36, marginLeft: '0.75rem' }}>{star === 5 ? '333' : star === 4 ? '2' : '0'}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mb-3">
                    <h6 className="mb-3">Rating Breakdown</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Seller communication level</span>
                      <span>5 <i className="bi bi-star-fill text-warning"></i></span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Recommend to a friend</span>
                      <span>5 <i className="bi bi-star-fill text-warning"></i></span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Service as described</span>
                      <span>5 <i className="bi bi-star-fill text-warning"></i></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                  <div>
                    <p className="mb-1 fw-semibold">Filters</p>
                    <p className="text-muted">Industry <strong>All Industries</strong></p>
                  </div>
                  <div className="text-muted">Most relevant</div>
                </div>
              </div>

              <div className="card border-0 rounded-4">
                <div className="card-body">
                  {[...binhLuanJob]
                    .slice(0, commentsToShow)
                    .map((cmt: BinhLuan, index: number) => {
                      return (
                        <div key={cmt.id || index} className={`pb-4 ${index !== Math.min(commentsToShow, binhLuanJob.length) - 1 ? 'border-bottom' : ''}`}>
                          <div className="d-flex align-items-start gap-3 my-3">
                            <img
                              src={cmt.avatar || `https://i.pravatar.cc/100?u=${cmt.avatar}`}
                              alt="Reviewer avatar"
                              className="rounded-circle border border-2 border-light"
                              width="56"
                              height="56"
                            />
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                <span className="fw-bold fs-6">{cmt.tenNguoiBinhLuan}</span>
                                <div className="d-flex align-items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`bi bi-star-fill ${i < Math.ceil(cmt.saoBinhLuan) ? 'text-warning' : 'text-secondary'}`}
                                      style={{ fontSize: '14px' }}
                                    ></i>
                                  ))}
                                </div>
                                <span className="badge bg-light text-dark border border-warning">{cmt.saoBinhLuan} Stars</span>
                              </div>
                              <small className="text-muted d-block mb-2">📍 United States • Published {cmt.ngayBinhLuan}</small>
                            </div>
                          </div>
                          <div className="ms-5 ps-2">
                            <p className="mb-3 text-dark lh-lg">{cmt.noiDung}</p>
                            <div className="d-flex gap-2 mb-4">
                              <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-500">
                                <i className="bi bi-hand-thumbs-up me-1"></i>Helpful
                              </button>
                              <button className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-500">
                                <i className="bi bi-hand-thumbs-down me-1"></i>Not Helpful
                              </button>
                            </div>
                            <div className="bg-light rounded-3 p-3 border-start border-5 border-success">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <i className="bi bi-chat-left-text text-success"></i>
                                <span className="fw-bold text-success">Seller's Response</span>
                              </div>
                              <p className="mb-2 text-muted">Thank you for your order it was a great experience working with you. Will be looking forward to work with you more.</p>
                              <small className="text-muted">
                                <i className="bi bi-clock-history"></i> Published {cmt.ngayBinhLuan}
                              </small>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  {(commentsToShow < binhLuanJob.length || commentsToShow > 3) && (
                    <div className="text-center mt-4 d-flex gap-2 justify-content-center">
                      {commentsToShow < binhLuanJob.length && (
                        <button
                          type="button"
                          className="btn btn-outline-primary rounded-pill px-4"
                          onClick={handleLoadMore}
                        >
                          <i className="bi bi-arrow-down me-2"></i>Xem Thêm
                        </button>
                      )}
                      {commentsToShow > 3 && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary rounded-pill px-4"
                          onClick={handleCollapse}
                        >
                          <i className="bi bi-arrow-up me-2"></i>Thu gọn
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="card border-0 shadow-sm rounded-4 ">
                <div className="card-body">
                  <h5 className="h6 mb-3">Add a Comment</h5>
                  <div className="mb-3">
                    <textarea
                      className="form-control rounded-4"
                      rows={5}
                      placeholder="Write your comment..."
                      value={comment} onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="position-sticky" style={{ top: '100px' }}>
            <div className="card shadow-sm rounded-4 border-0 mb-4">
              <div className="card-body">
                <ul className="nav nav-pills nav-fill mb-4" role="tablist">
                  {['Basic', 'Standard', 'Premium'].map((tab) => (
                    <li className="nav-item" key={tab} role="presentation">
                      <button
                        className={`nav-link ${tab === 'Standard' ? 'active' : 'text-secondary'}`}
                        type="button"
                        role="tab"
                      >
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <div className='d-flex flex-row justify-content-between align-items-center'>
                    <p className="text-muted mb-1">Standard</p>
                    <h3 className="mb-1">${jobDetail.congViec.giaTien}</h3>
                  </div>
                  <p className="text-muted mb-3">Create a simple web application for your business.</p>
                  <div className="d-flex flex-wrap gap-3 mb-4 text-muted small">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock"></i>
                      <span>30 Days Delivery</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-arrow-repeat"></i>
                      <span>1 Revision</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p>{jobDetail.congViec.moTaNgan}</p>
                </div>

                <button type="button" className="btn btn-success w-100 mb-2" onClick={() => {
                  const action = thueJob(jobDetail.congViec.id)
                  dispatch(action)
                }}>Continue (${jobDetail.congViec.giaTien})</button>
                <button type="button" className="btn btn-link text-success w-100">Compare Packages</button>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body text-center">
                <p className="mb-2 text-muted">Do you have any special requirements?</p>
                <button type="button" className="btn btn-outline-primary btn-sm">Get a Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail