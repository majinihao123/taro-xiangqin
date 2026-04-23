import { http } from '../utils/request'
import type { LoginResult, UserProfile, InitParams, UpdateProfileParams, OwnerChengwei } from '../types/api'

export const userApi = {
  /** POST /api/user/login — 登录/注册，返回 token 和初始化状态 */
  login: (openid: string) =>
    http.post<LoginResult>('/user/login', { openid }),

  /** POST /api/user/init — 扉页盖章，只能调用一次 */
  init: (ownerChengwei: OwnerChengwei, ownerName?: string) =>
    http.post<UserProfile>('/user/init', { owner_chengwei: ownerChengwei, owner_name: ownerName ?? '' } as InitParams),

  /** GET /api/user/profile */
  getProfile: () =>
    http.get<UserProfile>('/user/profile'),

  /** PUT /api/user/profile */
  updateProfile: (params: UpdateProfileParams) =>
    http.put<void>('/user/profile', params),
}
