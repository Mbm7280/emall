import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

// 模块
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'



export default createStore({
  modules: {
    cart,
    category,
    user
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage上
    createPersistedstate({
      // 本地存储名字
      key: 'emall-store',
      // 指定需要缓存的模块: user、cart
      paths: ['user','cart']
    })
  ]
})
  