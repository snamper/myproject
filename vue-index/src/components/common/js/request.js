import axios from 'axios'
import router from '@/router'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
})
service.interceptors.request.use(
    request => {
        // 在发送请求之前做些什么
        return request
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status != 1) {
            if (res.msg != '' && res.status == 0) {
                // return Promise.reject(response.data)
            }
            if (res.status == 404) {
                router.push({path: '/login'})
            }
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
