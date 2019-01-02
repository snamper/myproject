import request from 'common/js/request'

//获取订单列表
export function getMasterOrder(params) {
    return request({
        url: '/api/Operation/index',
        method: 'get',
        params
    })
}

//确认接单
export function acceptOrder(params) {
    return request({
        url: '/api/Operation/getOrder',
        method: 'post',
        data: params
    })
}

//师傅订单详情
export function masterOrderDetail(params) {
    return request({
        url: '/api/Operation/orderDetail',
        method: 'get',
        params
    })
}

//完成订单
export function OrderFinish(params) {
    return request({
        url: '/api/Operation/finish',
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

