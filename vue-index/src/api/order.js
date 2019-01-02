import request from 'common/js/request'

export function postOrderPayInfo(params) {
    return request({
        url: '/api/Order/orderSubmit',
        method: 'post',
        data: params
    })
}

//取消订单
export function cancelOrder(params) {
    return request({
        url: '/api/Operation/cancelOrder',
        method: 'post',
        data: params
    })
}

//评价订单
export function assessOrder(params) {
    return request({
        url: '/api/Order/comment',
        method: 'post',
        data: params
    })
}
