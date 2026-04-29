import React, { useEffect } from 'react'
import type { Dispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import type { UpdateThongTinValues } from '../ViewModel/UpdateThongTinValues'
import { getProfileApiActionThunk, putUpdateProfileActionThunk } from '../redux/reduces/UserReducer'
type Props = {}

const UpdateThongTin = (_props: Props) => {
  const { userProfile, userLogin } = useSelector((state: RootState) => state.UserReducer)
  const dispatch: Dispatch = useDispatch()
  const formUpdateProfile = useFormik<UpdateThongTinValues>({
    enableReinitialize: true,
    initialValues: {
      id: userProfile?.id || 0,
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      birthday: userProfile?.birthday || '',
      gender: userProfile?.gender ?? true,
      role: userProfile?.role || '',
      skill: userProfile?.skill || [],
      certification: userProfile?.certification || [],
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Họ tên không được bỏ trống!'),
      email: yup.string().required('Email không được bỏ trống!').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không đúng định dạng (VD: abc@gmail.com)'),
      phone: yup.string().required('Điện thoại không được bỏ trống!').matches(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ (phải đủ 10 số)'),
    }),
    onSubmit: (values: UpdateThongTinValues) => {
      const payload = {
        ...values,
        skill: typeof values.skill === 'string'
          ? (values.skill as string).split(',').map(s => s.trim()).filter(s => s !== "")
          : values.skill,
        certification: typeof values.certification === 'string'
          ? (values.certification as string).split(',').map(c => c.trim()).filter(c => c !== "")
          : values.certification,
      };
      dispatch(putUpdateProfileActionThunk(payload));
    }
  })
  useEffect(() => {
    if (userLogin?.id) {
      dispatch(getProfileApiActionThunk(userLogin.id))
    }
  }, [userLogin?.id])
  return (
    <form className='p-4' onSubmit={formUpdateProfile.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label fw-bold">
          ID <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          className="form-control"
          id="id"
          name="id"
          readOnly
          value={formUpdateProfile.values.id}
          onChange={formUpdateProfile.handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-bold">
          Họ và Tên <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${formUpdateProfile.touched.name && formUpdateProfile.errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          placeholder="Nhập họ và tên"
          value={formUpdateProfile.values.name}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
        {formUpdateProfile.touched.name && formUpdateProfile.errors.name && (
          <div className="invalid-feedback d-block">
            {formUpdateProfile.errors.name}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className={`form-control ${formUpdateProfile.touched.email && formUpdateProfile.errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          placeholder="Nhập email"
          value={formUpdateProfile.values.email}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
        {formUpdateProfile.touched.email && formUpdateProfile.errors.email && (
          <div className="invalid-feedback d-block">
            {formUpdateProfile.errors.email}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label fw-bold">
          Điện Thoại <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          className={`form-control ${formUpdateProfile.touched.phone && formUpdateProfile.errors.phone ? 'is-invalid' : ''}`}
          id="phone"
          name="phone"
          placeholder="Nhập số điện thoại"
          value={formUpdateProfile.values.phone}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
        {formUpdateProfile.touched.phone && formUpdateProfile.errors.phone && (
          <div className="invalid-feedback d-block">
            {formUpdateProfile.errors.phone}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="birthday" className="form-label fw-bold">
          Ngày Sinh
        </label>
        <input
          type="date"
          className="form-control"
          id="birthday"
          name="birthday"
          value={formUpdateProfile.values.birthday}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Giới Tính</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="genderMale"
            checked={formUpdateProfile.values.gender === true}
            onChange={() => formUpdateProfile.setFieldValue('gender', true)}
          />
          <label className="form-check-label" htmlFor="genderMale">
            Nam
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="genderFemale"
            checked={formUpdateProfile.values.gender === false}
            onChange={() => formUpdateProfile.setFieldValue('gender', false)}
          />
          <label className="form-check-label" htmlFor="genderFemale">
            Nữ
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label fw-bold">
          Vai Trò
        </label>
        <input
          type="text"
          className="form-control"
          id="role"
          name="role"
          placeholder="Nhập vai trò"
          value={formUpdateProfile.values.role}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="skill" className="form-label fw-bold">
          Kỹ Năng
        </label>
        <input
          type="text"
          className="form-control"
          id="skill"
          name="skill"
          placeholder="Nhập kỹ năng (cách nhau bởi dấu phẩy)"
          value={Array.isArray(formUpdateProfile.values.skill)
            ? (formUpdateProfile.values.skill as string[]).join(', ')
            : formUpdateProfile.values.skill}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
        <small className="form-text text-muted">
          VD: React, TypeScript, Node.js
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="certification" className="form-label fw-bold">
          Chứng Chỉ
        </label>
        <input
          type="text"
          className="form-control"
          id="certification"
          name="certification"
          placeholder="Nhập chứng chỉ (cách nhau bởi dấu phẩy)"
          value={Array.isArray(formUpdateProfile.values.certification)
            ? formUpdateProfile.values.certification.join(', ')
            : formUpdateProfile.values.certification}
          onChange={formUpdateProfile.handleChange}
          onBlur={formUpdateProfile.handleBlur}
        />
        <small className="form-text text-muted">
          VD: IELTS 7.5, AWS Certified
        </small>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary flex-grow-1"
          disabled={!formUpdateProfile.isValid}
        >
          <i className="fas fa-save"></i> Cập Nhật
        </button>
        <button
          type="button"
          className="btn btn-secondary flex-grow-1"
          onClick={() => {
            formUpdateProfile.setValues({
              id: userProfile?.id || 0,
              name: '',
              email: '',
              phone: '',
              birthday: '',
              gender: true,
              role: '',
              skill: [],
              certification: [],
            });
          }}
        >
          <i className="fas fa-redo"></i> Đặt Lại
        </button>
      </div>
    </form>
  )
}

export default UpdateThongTin