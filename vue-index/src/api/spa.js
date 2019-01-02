import request from 'common/js/request'

//客服中心
export function getKfzx(params) {
    return request({
        url: '/api/Spa/kfzx',
        method: 'get',
        params
    })
}

//郑重声明
export function getZzsm(params) {
    return request({
        url: '/api/Spa/zzsm',
        method: 'get',
        params
    })
}

//隐私政策
export function getYszc(params) {
    return request({
        url: '/api/Spa/yszc',
        method: 'get',
        params
    })
}

//注意事项
export function getZysx(params) {
    return request({
        url: '/api/Spa/zysx',
        method: 'get',
        params
    })
}

//服务流程
export function getFwlc(params) {
    return request({
        url: '/api/Spa/fwlc',
        method: 'get',
        params
    })
}

