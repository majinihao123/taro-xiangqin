// ─── 通用响应结构 ──────────────────────────────────────────────────────────────

export interface ApiResponse<T = void> {
  code: number
  data: T
  message?: string
}

// ─── 用户 ─────────────────────────────────────────────────────────────────────

export type OwnerChengwei = 'female' | 'male' | 'other'

/** GET /api/user/profile | POST /api/user/init 返回体 */
export interface UserProfile {
  id: number
  ownerChengwei: OwnerChengwei
  ownerName: string
  createdAt: string
}

/** POST /api/user/login 返回体 */
export interface LoginResult {
  token: string
  /** 是否已完成扉页初始化 */
  initialized: boolean
  profile: UserProfile
}

/** POST /api/user/init 请求体 */
export interface InitParams {
  owner_chengwei: OwnerChengwei
  owner_name?: string
}

/** PUT /api/user/profile 请求体 */
export interface UpdateProfileParams {
  owner_name: string
}

// ─── 手账记录 ─────────────────────────────────────────────────────────────────

export type SortField = 'created_at' | 'meet_date' | 'rating'

/** GET /api/journals 单条记录结构 */
export interface JournalEntry {
  id: number
  chengweiId: string
  name: string
  age: number | null
  meetDate: string | null
  notes: string | null
  tags: string[]
  rating: number | null
  createdAt: string
  updatedAt: string
}

/** GET /api/journals 返回体 */
export interface JournalListResult {
  list: JournalEntry[]
  total: number
  page: number
  pageSize: number
}

/** POST /api/journals 请求体 */
export interface CreateJournalParams {
  chengweiId: string
  name: string
  age?: number
  meetDate?: string
  notes?: string
  tags?: string[]
  rating?: number
}

/** PUT /api/journals/:id 请求体（所有字段可选） */
export type UpdateJournalParams = Partial<CreateJournalParams>
