import Taro from '@tarojs/taro'

const BASE_URL = 'http://localhost:3000/api'

interface Response<T = any> {
  code: number
  data: T
  message?: string
}

async function request<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  data?: object
): Promise<T> {
  const token = Taro.getStorageSync('xq_token')
  const res = await Taro.request<Response<T>>({
    url: BASE_URL + path,
    method,
    data,
    header: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (res.statusCode === 401) {
    Taro.removeStorageSync('xq_token')
    throw new Error('未登录')
  }
  if (res.data.code !== 0) {
    throw new Error(res.data.message || '请求失败')
  }
  return res.data.data
}

export const http = {
  get: <T = any>(path: string) => request<T>('GET', path),
  post: <T = any>(path: string, data?: object) => request<T>('POST', path, data),
  put: <T = any>(path: string, data?: object) => request<T>('PUT', path, data),
  del: <T = any>(path: string) => request<T>('DELETE', path),
}
