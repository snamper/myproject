import request from 'common/js/request'

export function getProDetail(params) {
    return request({
        url: "/api/Index/getProductDetail",
        method: 'get',
        params
    })
}
