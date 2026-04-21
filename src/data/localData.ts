export interface ChengweiOption {
  id: string
  label: string
  desc: string
  gender: 'male' | 'female' | 'neutral'
}

export interface JournalEntry {
  id: string
  chengweiId: string
  name: string
  age: number
  date: string
  notes: string
  tags: string[]
  rating: number
  createdAt: string
}

export const CHENGWEI_OPTIONS: ChengweiOption[] = [
  { id: 'gege', label: '哥哥', desc: '年龄比我大的男生', gender: 'male' },
  { id: 'didi', label: '弟弟', desc: '年龄比我小的男生', gender: 'male' },
  { id: 'jiejie', label: '姐姐', desc: '年龄比我大的女生', gender: 'female' },
  { id: 'meimei', label: '妹妹', desc: '年龄比我小的女生', gender: 'female' },
  { id: 'nanfang', label: '男方', desc: '中性称呼，男性相亲对象', gender: 'male' },
  { id: 'nvfang', label: '女方', desc: '中性称呼，女性相亲对象', gender: 'female' },
  { id: 'ta_male', label: '他', desc: '简单称呼男性', gender: 'male' },
  { id: 'ta_female', label: '她', desc: '简单称呼女性', gender: 'female' },
]

export const JOURNAL_ENTRIES: JournalEntry[] = []

export const APP_CONFIG = {
  ownerChengwei: '',
  ownerName: '',
  createdAt: '',
}
