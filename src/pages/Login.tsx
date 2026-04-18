import React, { useState } from 'react'
import type { Dispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import type { LoginData } from '../ViewModel/LoginFormValues'
import * as yup from 'yup';
import { loginActionApi } from '../redux/reduces/UserReducer'
import { NavLink } from 'react-router-dom'
type Props = {
  children?: React.ReactNode
}

const Login = (_props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: Dispatch = useDispatch()
  const userLoginForm = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email cannot be blank!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email is invalid - Ex: abc@gmail.com'),
      password: yup.string().required('Password cannot be blank!').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+= \[\{\]\};:\'\" ,<>\/?\\|`~]).{8,}$/, 'Password must be at least 8 characters, include uppercase, number and special character')
    }),
    onSubmit: (value: LoginData) => {
      const action = loginActionApi(value)
      dispatch(action)
    }
  })
  return (
    <div className="container-fluid min-vh-100 bg-white">
      <div className="row g-0 min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row shadow-lg rounded-4 overflow-hidden">
            <div
              className="col-12 col-md-6 d-none d-md-block position-relative"
              style={{ minHeight: '560px' }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-center px-4">
                <h2 className="display-6 fw-bold text-white">Chào mừng trở lại</h2>
                <p className="text-white-50">Đăng nhập để tiếp tục tìm kiếm công việc phù hợp với bạn.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 bg-white p-5">
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="mb-5">
                  <h1 className="fw-bold">ĐĂNG NHẬP</h1>
                  <p className="text-muted mb-0">Nhập tài khoản và mật khẩu của bạn.</p>
                </div>
                <form onSubmit={userLoginForm.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email" name='email'
                      className="form-control form-control-lg border-0 border-bottom rounded-0"
                      placeholder="Nhập tài khoản" value={userLoginForm.values.email} onInput={userLoginForm.handleChange} onBlur={userLoginForm.handleBlur}
                    />
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userLoginForm.touched.email && userLoginForm.errors.email}
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Mật khẩu
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password" name='password'
                      className="form-control form-control-lg border-0 border-bottom rounded-0" style={{ paddingRight: '45px' }}
                      placeholder="Nhập mật khẩu" value={userLoginForm.values.password} onInput={userLoginForm.handleChange} onBlur={userLoginForm.handleBlur}
                    />
                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute', right: '15px', top: '50px', cursor: 'pointer',color: '#6c757d', zIndex: 10, fontSize: '18px'
                      }}
                    ></i>
                    <div className="text-danger mt-2" style={{ minHeight: '1.25rem' }}>
                      {userLoginForm.touched.password && userLoginForm.errors.password}
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <button type="submit" className="btn btn-primary btn-lg flex-fill">
                      Đăng nhập
                    </button>
                    <NavLink to='/register' className="btn btn-outline-primary btn-lg flex-fill">
                      Đăng ký
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

export default Login