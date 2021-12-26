<template>
   <div class="container">
    <!-- 默认的模块，state 区分模块，其他 getters mutations actions 都在全局。 -->
    <!-- 带命名空间 namespaced: true 的模块，所有功能区分模块，更高封装度和复用。 -->
     <!-- 使用 moduleA 的数据 -->
     <p>{{$store.state.moduleA.username}}</p>
     <!-- 使用 moduleA 模块中的 getters 数据 -->
     <!-- <p>{{$store.getters.moduleA.newName}}</p>   全局-找不到moduleA -->
     <p>{{$store.getters.newName}}</p>
     <!-- 使用 moduleB 的数据 -->
     <p>{{$store.state.moduleB.username}}</p>
     <!-- <p>{{$store.getters.moduleB.newName}}</p> 带命名空间操作 getters 不支持此写法 -->
      <!-- 操作 getters 正确写法 -->
     <p>{{$store.getters['moduleB/newName']}}</p>
     <button @click="mutationsFn">mutationsFn</button>
     <button @click="actionsFn">actionsFn</button>
   </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    // 调用 B mutations
    const mutationsFn = () => {
      store.commit('moduleB/updateName')
    }
    // 调用 B actions
    const actionsFn = () => {
      store.dispatch('moduleB/updateName')
    }
    return {
      mutationsFn,
      actionsFn
    }
  }
}
</script>
