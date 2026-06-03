import {
  ACCESSTOKEN,
  USERLOGIN,
  getLocalStorage,
  removeCookie,
  removeStore,
  saveCookie,
  saveLocalStorage,
} from '../../util/config'

export type StoredUser = {
  id?: number | string
  name?: string
  email?: string
}

export type AdminSession = {
  id?: number | string
  name?: string
  email?: string
  role?: string
  token: string
}

export type AuthResponseContent = {
  user?: {
    id?: number | string
    name?: string
    email?: string
    role?: string
    maLoaiNguoiDung?: string
    accessToken?: string
    [key: string]: unknown
  }
  token?: string
  accessToken?: string
  role?: string
  maLoaiNguoiDung?: string
  [key: string]: unknown
}

type DecodedTokenPayload = Record<string, unknown> & {
  role?: string
  maLoaiNguoiDung?: string
  user?: {
    role?: string
    maLoaiNguoiDung?: string
  }
}

export const ADMIN_AUTH_KEY = 'adminAuth'

export const asString = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return ''
}

const normalizeRole = (role?: string | null) => (role || '').toLowerCase().replace(/\s+/g, '').replace(/_/g, '')

export const isAdminRole = (role?: string | null) => {
  const normalized = normalizeRole(role)
  return normalized.includes('admin') || normalized.includes('quantri') || normalized.includes('quảntri')
}

const decodeJwtPayload = (token: string): DecodedTokenPayload | null => {
  try {
    const payloadPart = token.split('.')[1]
    if (!payloadPart) return null
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((char) => `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export const getRoleFromToken = (token?: string | null) => {
  if (!token) return null
  const payload = decodeJwtPayload(token)
  if (!payload) return null
  return (
    payload.role ||
    payload.maLoaiNguoiDung ||
    payload.user?.role ||
    payload.user?.maLoaiNguoiDung ||
    asString(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) ||
    null
  )
}

export const getRoleFromAuthResponse = (content: AuthResponseContent, token?: string | null) => {
  return (
    content.user?.role ||
    content.user?.maLoaiNguoiDung ||
    content.role ||
    content.maLoaiNguoiDung ||
    getRoleFromToken(token) ||
    null
  )
}

export const getStoredAdminSession = (): AdminSession | null => {
  const stored = getLocalStorage<AdminSession>(ADMIN_AUTH_KEY)
  if (stored?.token && isAdminRole(stored.role || getRoleFromToken(stored.token))) {
    return stored
  }

  const accessToken = getLocalStorage<string>(ACCESSTOKEN)
  if (accessToken) {
    const role = getRoleFromToken(accessToken)
    if (isAdminRole(role)) {
      const storedUser = getLocalStorage<StoredUser>(USERLOGIN)
      return {
        id: storedUser?.id,
        name: storedUser?.name,
        email: storedUser?.email,
        role: role ?? 'admin',
        token: accessToken,
      }
    }
  }

  return null
}

export const saveAdminSession = (session: AdminSession) => {
  saveLocalStorage(ADMIN_AUTH_KEY, session)
  saveLocalStorage(ACCESSTOKEN, session.token)
  saveLocalStorage(USERLOGIN, {
    id: session.id ?? 0,
    email: session.email,
    accessToken: session.token,
  })
  saveCookie(ACCESSTOKEN, session.token)
  saveCookie(USERLOGIN, session.email ?? '')
}

export const clearAdminSession = () => {
  removeStore(ADMIN_AUTH_KEY)
  removeStore(ACCESSTOKEN)
  removeStore(USERLOGIN)
  removeCookie(ACCESSTOKEN)
  removeCookie(USERLOGIN)
}
