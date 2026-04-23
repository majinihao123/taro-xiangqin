import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import { userApi } from './api/user'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    try {
      // 开发阶段用设备唯一标识模拟 openid
      let openid = Taro.getStorageSync('xq_openid')
      if (!openid) {
        // 生产环境改为 Taro.login() 获取 code 再换 openid
        openid = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
        Taro.setStorageSync('xq_openid', openid)
      }

      const result = await userApi.login(openid)
      Taro.setStorageSync('xq_token', result.token)
      Taro.setStorageSync('xq_initialized', result.initialized)
    } catch (e) {
      console.error('登录失败', e)
    }
  })

  return children
}

export default App
