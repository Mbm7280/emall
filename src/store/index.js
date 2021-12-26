import { createStore } from 'vuex'

// A模块-不开启命名空间
const moduleA = {
  state: {
    username: 'moduleA'
  },
  getters: {
    newName (state) {
      return state.username + '!!!!!!!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'moduleAaaaaaaaa'
    }
  }
}
// B模块-开启命名空间
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  getters: {
    newName (state) {
      return state.username + '!!!!!!!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'lyy'
    }
  },
  // 请求数据函数
  actions: {
    updateName (ctx) {
      // 发请求
      setTimeout(() => {
        ctx.commit('updateName')
      }, 1000)
    }
  }
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})

// 创建仓库：
// vue2.0 new Vuex.Store({})
// vue3.0 createStore({})
// export default createStore({
//   // 数据
//   state: {
//     username: 'mbm'
//   },
//   // 改数据函数
//   mutations: {
//     updateName (state, payload) {
//       state.username = 'lyy'
//     }
//   },
//   // 请求数据函数
//   actions: {
//     updateName (ctx) {
//       // 发请求
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   },
//   // 分模块
//   modules: {
//   },
//   // vuex的计算属性
//   getters: {
//     newName (state) {
//       return state.username + '!!!!!!!!!'
//     }
//   }
// })
