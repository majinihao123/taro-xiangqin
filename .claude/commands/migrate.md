# /migrate — 相亲手账·接口协议脚手架

用户描述一个新功能模块后，按以下固定顺序输出代码，确保前端类型与后端 Swagger Schema 严格一致。

---

## 你必须完成的输出步骤（缺一不可）

### Step 1 · 类型定义

追加到 `src/types/api.ts`：

```ts
// ─── <模块名> ──────────────────────────────────────────────────────────────────

/** GET /api/<module> 单条结构 */
export interface XxxEntry { ... }

/** GET /api/<module> 列表返回体（若有分页） */
export interface XxxListResult {
  list: XxxEntry[]
  total: number
  page: number
  pageSize: number
}

/** POST /api/<module> 请求体 */
export interface CreateXxxParams { ... }

/** PUT /api/<module>/:id 请求体 */
export type UpdateXxxParams = Partial<CreateXxxParams>
```

规则：
- 字段名全部用 camelCase，与后端 `format()` 输出完全对齐
- nullable 字段标注 `T | null`
- 枚举字段用 `type XxxType = 'a' | 'b'` 单独定义并复用

### Step 2 · API 客户端

新建 `src/api/<module>.ts`：

```ts
import { http } from '../utils/request'
import type { XxxEntry, XxxListResult, CreateXxxParams, UpdateXxxParams } from '../types/api'

export const xxxApi = {
  /** GET /api/<module> */
  list: (...) => http.get<XxxListResult>(...),

  /** GET /api/<module>/:id */
  detail: (id: number) => http.get<XxxEntry>(`/<module>/${id}`),

  /** POST /api/<module> */
  create: (data: CreateXxxParams) => http.post<XxxEntry>('/<module>', data),

  /** PUT /api/<module>/:id */
  update: (id: number, data: UpdateXxxParams) => http.put<XxxEntry>(`/<module>/${id}`, data),

  /** DELETE /api/<module>/:id */
  remove: (id: number) => http.del<void>(`/<module>/${id}`),
}
```

规则：
- 每个方法写 JSDoc 注释标明路由
- 从 `../types/api` 引入类型，禁止在 api 文件内定义类型
- 使用 `http.get / http.post / http.put / http.del`，不直接调用 `Taro.request`

---

## 字段命名规则（协议强制）

| 层级 | 风格 | 示例 |
|------|------|------|
| 后端数据库列名 | snake_case | `meet_date` |
| 后端 format() / Swagger | camelCase | `meetDate` |
| `src/types/api.ts` | camelCase | `meetDate` |
| `src/api/*.ts` 请求参数 | camelCase | `meetDate` |
| 页面组件变量 | camelCase | `meetDate` |

---

## 类型与后端对齐检查清单

输出代码前，逐项确认：
- [ ] `XxxEntry` 的每个字段名与后端 `format()` 返回的 key 完全一致
- [ ] nullable 字段（数据库允许 NULL）在 TS 类型中标注 `| null`
- [ ] `CreateXxxParams` 的必填字段与后端 `ctx.throw(400, ...)` 校验逻辑一致
- [ ] API 路径字符串与后端 `src/routes/index.js` 中的路由定义一致

---

## 参考现有模式

- 类型参考：`src/types/api.ts` 中 `JournalEntry` / `CreateJournalParams`
- API 客户端参考：`src/api/journal.ts`
- 请求工具：`src/utils/request.ts`（`http.get/post/put/del`）
