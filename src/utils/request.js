// 1、创建一个新的 axios 示例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 到处基准地址，后续其他地方不是通过 axios 发送请求
const instance = axios.create({
    // axios 的一些配置，baseURL  timeout
    baseURL,
    timeout: 5000
  })

instance.interceptors.request.use(config => {
    // 获取用户信息
    const { profile } = store.state.user
    // 判断是否有 token
    console.log(profile.token)
    if(profile.token){
        // 设置 token
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})

// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
    // 401 状态码，进入该函数
    if(err.response && err.response.status === 401){
        // 1、清空本地无效的用户信息
        store.commit('user/setUser', {})
        // 2、跳转到登录页面
        // 3、跳转需要传参(当前路由地址)给登录页面 encodeURIComponent 转换 uri 编码
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
    // 负责发请求：请求地址、请求方式、提交的数据
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用 params 来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用 data 来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // method参数：get,Get,GET  转换成小写再来判断
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}