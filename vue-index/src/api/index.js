import request from 'common/js/request'

export function getIndexInfo(params) {
    return request({
        url: '/api/Index/index',
        method: 'get',
        params
    })
}

export function getIndexNextPage(params) {
    return request({
        url: '/api/Index/indexNextPage',
        method: 'get',
        params
    })
}
