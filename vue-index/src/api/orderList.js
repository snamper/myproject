import request from 'common/js/request'

//获取订单列表
export function getOrderList(params) {
    return request({
        url: '/api/Order/index',
        method: 'get',
        params
    })
}

//删除订单
export function delOrder(params) {
    return request({
        url: '/api/Order/delete',
        method: 'get',
        params
    })
}

//订单详情
export function getOrderDetail(params) {
    return request({
        url: '/api/Order/orderDetail',
        method: 'get',
        params
    })
}

//取消订单
export function cancelOrder(params) {
    return request({
        url: '/api/Order/cancelOrder',
        method: 'post',
        data: params
    })
}

//支付
export function orderPay(params) {
    return request({
        url: '/api/Order/payIt',
        method: 'post',
        data: params
    })
}

//上传图片
export function uploadImg(params) {
    return request({
        url: '/api/Common/uploadImg',
        method: 'post',
        data: params
    })
}
