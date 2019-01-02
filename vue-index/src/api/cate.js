import request from 'common/js/request'

export function getCate(params) {
    return request({
        url: '/api/Cate/index',
        method: 'get',
        params
    })
}

export function getCateList(params) {
    return request({
        url: '/api/Cate/getProductByCate',
        method: 'get',
        params
    })
}

export function getProductDetail(params) {
    return request({
        url: '/api/Index/getProductDetail',
        method: 'get',
        params
    })
}

