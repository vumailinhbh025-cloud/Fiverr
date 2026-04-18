import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Dispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobSearch } from '../redux/reduces/SearchFiver'
import type { SearchModel } from '../ViewModel/SearchModel'

type Props = { children?: React.ReactNode }

const Search = (_props: Props) => {
    const [searchParams] = useSearchParams()
    const dispatch: Dispatch = useDispatch();
    const { arrSearchFiver } = useSelector((state: RootState) => state.SearchFiver)
    const k = searchParams.get('tenCongViec')
    useEffect(() => {
        if (k) {
            const action = getAllJobSearch(k)
            dispatch(action)
        }
    }, [k])
    return (
        <div className="container pt-2 pb-5 bg-light">
            <h2 className='m-4'>Kết quả tìm kiếm: <span className="text-success">"{k}"</span></h2>
            <div className="row g-4 justify-content-center">
                {arrSearchFiver.map((jobSearch: SearchModel, index: number) => {
                    return <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                        <div className="card h-100 shadow-sm bg-white border-0" style={{ border: '1px solid #e4e5e7', borderRadius: '8px', overflow: 'hidden' }}>
                            <div className="border-bottom text-center bg-white">
                                <img
                                    src={jobSearch.congViec.hinhAnh}
                                    className="card-img-top"
                                    style={{ height: '270px', maxWidth: '100%', objectFit: 'cover' }}
                                    alt="job"
                                />
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src={`https://i.pravatar.cc/150?u=${jobSearch.id}`}
                                        className="rounded-circle me-3"
                                        alt="Avatar"
                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                    <div className="lh-sm">
                                        <div className="fw-bold text-dark mb-2" style={{ fontSize: '20px' }}>{jobSearch.tenNguoiTao}</div>
                                        <div className="text-muted" style={{ fontSize: '18px' }}>Level 2 Seller</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 18 }}>{jobSearch.congViec.moTaNgan}</p>
                                <div className="d-flex align-items-center">
                                    {[...Array(5)].map((_, index) => {
                                        return (
                                            <i
                                                className="bi bi-star-fill me-1"
                                                style={{ color: index < jobSearch.congViec.saoCongViec ? '#ffbe5b' : '#e4e5e7', fontSize: '18px' }}
                                                key={index}
                                            />
                                        )
                                    })}
                                    <span style={{ fontWeight: '700', color: '#ffbe5b', fontSize: '20px' }}>{jobSearch.congViec.danhGia}</span>
                                    <span className="ms-1 text-muted" style={{ fontSize: '20px' }}>({jobSearch.congViec.nguoiTao})</span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top px-4 d-flex justify-content-between align-items-center">
                                <i className="bi bi-heart-fill" style={{ fontSize: '22px', color: '#ff4d4f' }} />
                                <div className="text-end">
                                    <div className="text-uppercase text-muted" style={{ fontSize: '15px', fontWeight: '800' }}>Starting at</div>
                                    <div className="fw-bold" style={{ fontSize: '20px' }}>${jobSearch.congViec.giaTien}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Search