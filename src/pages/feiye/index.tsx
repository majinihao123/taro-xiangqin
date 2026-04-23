import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { userApi } from '../../api/user'
import './index.scss'

type IdentityKey = 'female' | 'male' | 'other'

interface OptionItem {
  key: IdentityKey
  zh: string
  en: string
  sub: string
  color: string
  icon: string
}

const OPTIONS: OptionItem[] = [
  { key: 'female', zh: '女士', en: 'Ms.', sub: '我是女生 · 记录男方', color: '#A84846', icon: '♀' },
  { key: 'male',   zh: '先生', en: 'Mr.', sub: '我是男生 · 记录女方', color: '#3D5A80', icon: '♂' },
  { key: 'other',  zh: '不想说', en: '—', sub: '中性 · 不区分',       color: '#6E5B48', icon: '·' },
]

function ConfirmModal({ pick, onCancel, onConfirm }: {
  pick: OptionItem
  onCancel: () => void
  onConfirm: () => void
}) {
  const [stamping, setStamping] = useState(false)

  function handleConfirm() {
    setStamping(true)
    setTimeout(onConfirm, 700)
  }

  return (
    <View className='modal-overlay' onClick={onCancel}>
      <View className='modal-card' style={{ boxShadow: `0 40rpx 80rpx rgba(0,0,0,0.28), 8rpx 8rpx 0 ${pick.color}` }} onClick={e => e.stopPropagation()}>
        <Text className='modal-card__meta'>FINAL · CONFIRM</Text>
        <View style={{ marginTop: '12rpx' }}>
          <Text className='modal-card__title'>
            {'确认称谓为 '}
            <Text style={{ color: pick.color }}>{pick.zh}</Text>
            {' ?'}
          </Text>
        </View>
        <View className='modal-card__rule' />
        <Text className='modal-card__body'>
          {'盖章之后，本子上的称谓便不再更改。\n以后每一次见面的记录，都以此为准。'}
        </Text>
        <View className='modal-card__seal-area'>
          <View className='modal-card__seal-ring' />
          {stamping ? (
            <View className='modal-card__seal-stamp' style={{ color: pick.color, borderColor: pick.color }}>
              <Text className='modal-card__seal-stamp-text' style={{ color: pick.color }}>{pick.zh}</Text>
            </View>
          ) : (
            <Text className='modal-card__seal-placeholder'>印章处</Text>
          )}
        </View>
        <View className='modal-card__btns'>
          <View className='modal-card__btn-cancel' onClick={stamping ? undefined : onCancel}>
            <Text className='modal-card__btn-text modal-card__btn-text--cancel'>再想想</Text>
          </View>
          <View
            className='modal-card__btn-confirm'
            style={{ background: pick.color }}
            onClick={stamping ? undefined : handleConfirm}
          >
            <Text className='modal-card__btn-text modal-card__btn-text--confirm'>
              {stamping ? '盖章中…' : '确认 · 盖章'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function FeiyePage() {
  const [pick, setPick] = useState<IdentityKey | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 已初始化过则跳过扉页
    const initialized = Taro.getStorageSync('xq_initialized')
    if (initialized) {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
  }, [])

  async function handleSubmit(key: IdentityKey) {
    setLoading(true)
    try {
      await userApi.init(key)
      Taro.setStorageSync('xq_initialized', true)
      setConfirming(false)
      Taro.showToast({ title: '手账已开本！', icon: 'success', duration: 1500 })
      setTimeout(() => {
        Taro.redirectTo({ url: '/pages/index/index' })
      }, 1500)
    } catch (e: any) {
      setConfirming(false)
      Taro.showToast({ title: e.message || '提交失败', icon: 'error', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  const selectedOption = OPTIONS.find(o => o.key === pick) ?? null

  return (
    <View className='feiye-page'>
      <View className='status-bar' />

      <View className='tape tape--yellow' style={{ top: '110rpx', left: '40rpx', width: '180rpx', transform: 'rotate(-8deg)', zIndex: 3 }} />
      <View className='tape tape--pink'   style={{ top: '130rpx', right: '40rpx', width: '140rpx', transform: 'rotate(10deg)', zIndex: 3 }} />

      <View className='masthead'>
        <Text className='masthead__vol'>VOL.03 · SPRING 2026</Text>
        <View>
          <Text className='masthead__title'>
            {'相亲\n'}
            <Text className='masthead__title-accent'>手账</Text>
          </Text>
        </View>
        <Text className='masthead__subtitle'>— Blind-Date Journal —</Text>
      </View>

      <View className='inscription'>
        <Text className='inscription__label'>INSCRIPTION · 题记</Text>
        <View style={{ marginTop: '12rpx' }}>
          <Text className='inscription__body'>
            {'写在扉页 · '}
            <Text className='inscription__highlight'>本子一旦开页，称谓便不可更改。</Text>
            {'\n时间不回头 · 人也一样。\n'}
            <Text className='inscription__sub'>请选择你的身份，之后每一位遇见的人，都将记在这本子里。</Text>
          </Text>
        </View>
      </View>

      <View className='picker'>
        <Text className='picker__label'>CHOOSE · 选择你的称谓</Text>
        {OPTIONS.map((o, i) => {
          const active = pick === o.key
          const rotations = [0.4, -0.4, 0.4]
          return (
            <View
              key={o.key}
              className={`option-card${active ? ' option-card--active' : ''}`}
              style={{
                borderColor: active ? o.color : 'rgba(100,70,40,0.25)',
                boxShadow: active
                  ? `6rpx 6rpx 0 ${o.color}, 0 12rpx 28rpx rgba(80,60,30,0.12)`
                  : '0 4rpx 8rpx rgba(80,60,30,0.05)',
                transform: active ? `rotate(${rotations[i]}deg)` : 'none',
              }}
              onClick={() => setPick(o.key)}
            >
              <View
                className='option-card__circle'
                style={{
                  borderColor: active ? o.color : 'rgba(100,70,40,0.35)',
                  background: active ? o.color : 'transparent',
                }}
              >
                <Text className='option-card__circle-text' style={{ color: active ? '#FBF5E4' : o.color }}>
                  {active ? '✓' : o.icon}
                </Text>
              </View>
              <View className='option-card__info'>
                <View className='option-card__title-row'>
                  <Text className='option-card__zh' style={{ color: active ? o.color : '#2B2620' }}>{o.zh}</Text>
                  <Text className='option-card__en'>{o.en}</Text>
                </View>
                <Text className='option-card__sub'>{o.sub}</Text>
              </View>
              {active && (
                <View className='option-card__seal' style={{ color: o.color, borderColor: o.color }}>
                  <Text className='option-card__seal-text' style={{ color: o.color }}>选此</Text>
                </View>
              )}
            </View>
          )
        })}
      </View>

      <View className='warning'>
        <Text className='warning__flag'>⚑</Text>
        <Text className='warning__text'>
          {'提交后称谓'}
          <Text className='warning__underline' style={{ fontWeight: '700' }}>不可修改</Text>
          {'。\n如需更改，只能清空整本手账，重新开本。'}
        </Text>
      </View>

      <View className='submit-area'>
        <View
          className={`submit-area__btn${pick && !loading ? ' submit-area__btn--active' : ' submit-area__btn--inactive'}`}
          onClick={pick && !loading ? () => setConfirming(true) : undefined}
        >
          <Text className={`submit-area__btn-text${pick && !loading ? ' submit-area__btn-text--active' : ' submit-area__btn-text--inactive'}`}>
            {loading ? '提交中…' : pick ? '盖章 · 开本' : '请先选择一项'}
          </Text>
        </View>
        <Text className='submit-area__hint'>— SIGNED · SEALED · ONCE —</Text>
      </View>

      {confirming && selectedOption && (
        <ConfirmModal
          pick={selectedOption}
          onCancel={() => setConfirming(false)}
          onConfirm={() => handleSubmit(selectedOption.key)}
        />
      )}
    </View>
  )
}
