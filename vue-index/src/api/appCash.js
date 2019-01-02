import request from 'common/js/request'

//银行卡列表
export function bankList(params) {
    return request({
        url: '/api/Bank/banklist',
        method: 'get',
        params
    })
}

//我的银行卡列表
export function myBankList(params) {
    return request({
        url: '/api/Bank/index',
        method: 'get',
        params
    })
}

//申请提现
export function postAppCash(params) {
    return request({
        url: '/api/Cash/addCash',
        method: 'post',
        data: params
    })
}

//获取手续费
export function getCharge(params) {
    return request({
        url: '/api/Cash/addCash',
        method: 'get',
        params
    })
}

//添加银行
export function addBank(params) {
    return request({
        url: '/api/Bank/addBank',
        method: 'post',
        data: params
    })
}

//删除银行卡
export function delBank(params) {
    return request({
        url: '/api/Bank/deleteBank',
        method: 'post',
        data: params
    })
}

//银行卡信息
export function bankInfo(params) {
    return request({
        url: '/api/Bank/detail',
        method: 'post',
        data: params
    })
}
