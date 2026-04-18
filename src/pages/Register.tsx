import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from 'yup';
import type { RegisterFormValues } from '../ViewModel/RegisterFormValues';
import { registerActionApi } from '../redux/reduces/UserReducer';
import type { Dispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
type Props = {
    children?: React.ReactNode
}
const Register = (_props: Props) => {
  const [showPassword, setShowPassWord]= useState(false)
  const [showPasswordConfirm, setShowPassWordConfirm]= useState(false)
  const dispatch:Dispatch=useDispatch()
  const userRegisterForm = useFormik<RegisterFormValues>({
    initialValues:{
      id: 0,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      birthday: '',
      gender: true,
      role: '',
      skill: [],
      certification: [],
    }, 
    validationSchema: yup.object().shape({
      email: yup.string().required("Email cannot be blank!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email is invalid - Ex: abc@gmail.com'),

      password: yup.string().required('Password cannot be blank!').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+= \[\{\]\};:\'\" ,<>\/?\\|`~]).{8,}$/, 'Password must be at least 8 characters, include uppercase, number and special character'),

      confirmPassword: yup.string().required('Password cannot be blank!').oneOf([yup.ref('password')], 'Passwords must match'),

      name: yup.string().required('Name cannot be blank!'),

      phone: yup.string().required('Phone number is required!').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    })
    ,onSubmit: (values: RegisterFormValues) => {
      const action= registerActionApi(values)
      dispatch(action)
    },
  })
  return (
    <div className="container-fluid h-100 bg-white">
      <div className="row g-0 pt-5 align-items-center justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row shadow-lg rounded-4 overflow-hidden">
            <div
              className="col-12 col-md-6 d-none d-md-block position-relative"
              style={{ minHeight: '700px' }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundImage:
                    'url(https://wp-cms-media.s3.ap-east-1.amazonaws.com/Nhan_vien_van_phong_3_ddeae6de5c.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-center px-4">
                <h2 className="display-6 fw-bold text-white">Tạo tài khoản mới</h2>
                <p className="text-white-50">Tham gia cộng đồng và bắt đầu tìm việc ngay hôm nay.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 bg-white p-5" style={{ minHeight: '700px' }}>
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="mb-3">
                  <h1 className="fw-bold">ĐĂNG KÝ</h1>
                  <p className="text-muted mb-0">Tạo tài khoản mới để truy cập toàn bộ tính năng.</p>
                </div>

                <form onSubmit={userRegisterForm.handleSubmit}>
                  <div className="mb-2">
                    <label htmlFor="fullName" className="form-label fw-semibold">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="name"
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập họ tên"
                      value={userRegisterForm.values.name}
                      onChange={userRegisterForm.handleChange}
                      onBlur={userRegisterForm.handleBlur}
                    />
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userRegisterForm.touched.name && userRegisterForm.errors.name}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập email"
                      value={userRegisterForm.values.email}
                      onChange={userRegisterForm.handleChange}
                      onBlur={userRegisterForm.handleBlur}
                    />
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userRegisterForm.touched.email && userRegisterForm.errors.email}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập số điện thoại"
                      value={userRegisterForm.values.phone}
                      onChange={userRegisterForm.handleChange}
                      onBlur={userRegisterForm.handleBlur}
                    />
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userRegisterForm.touched.phone && userRegisterForm.errors.phone}
                    </div>
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Mật khẩu
                    </label>
                    <input
                      type={showPassword ? "text" : 'password'}
                      id="password"
                      name="password"
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập mật khẩu"
                      value={userRegisterForm.values.password}
                      onChange={userRegisterForm.handleChange}
                      onBlur={userRegisterForm.handleBlur}
                    />
                    <i className={`fa ${showPassword? 'fa-eye-slash' : 'fa-eye'}`} onClick={()=>{
                      setShowPassWord(!showPassword)
                    }}
                      style={{
                        position: 'absolute', right: '15px', top: '50px', cursor: 'pointer',color: '#6c757d', zIndex: 10, fontSize: '18px'
                      }}
                    ></i>
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userRegisterForm.touched.password && userRegisterForm.errors.password}
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                      Nhập lại mật khẩu
                    </label>
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập lại mật khẩu"
                      value={userRegisterForm.values.confirmPassword}
                      onChange={userRegisterForm.handleChange}
                      onBlur={userRegisterForm.handleBlur}
                    />
                    <i className={`fa ${showPasswordConfirm ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={() => setShowPassWordConfirm(!showPasswordConfirm)}
                      style={{
                        position: 'absolute', right: '15px', top: '50px', cursor: 'pointer',color: '#6c757d', zIndex: 10, fontSize: '18px'
                      }}
                    ></i>
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userRegisterForm.touched.confirmPassword && userRegisterForm.errors.confirmPassword}
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <button type="submit" className="btn btn-primary btn-lg flex-fill" disabled={!userRegisterForm.isValid}>
                      Đăng ký
                    </button>
                    <NavLink to='/login' type="button" className="btn btn-outline-primary btn-lg flex-fill">
                      Đăng nhập
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register