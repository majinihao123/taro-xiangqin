import { http } from '../utils/request'
import type {
  JournalEntry,
  JournalListResult,
  CreateJournalParams,
  UpdateJournalParams,
  SortField,
} from '../types/api'

export const journalApi = {
  /** GET /api/journals — 分页列表 */
  list: (page = 1, pageSize = 20, sort: SortField = 'created_at') =>
    http.get<JournalListResult>(`/journals?page=${page}&pageSize=${pageSize}&sort=${sort}`),

  /** GET /api/journals/:id */
  detail: (id: number) =>
    http.get<JournalEntry>(`/journals/${id}`),

  /** POST /api/journals */
  create: (data: CreateJournalParams) =>
    http.post<JournalEntry>('/journals', data),

  /** PUT /api/journals/:id */
  update: (id: number, data: UpdateJournalParams) =>
    http.put<JournalEntry>(`/journals/${id}`, data),

  /** DELETE /api/journals/:id */
  remove: (id: number) =>
    http.del<void>(`/journals/${id}`),
}
