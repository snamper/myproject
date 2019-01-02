import * as types from './mutation-types'
import request from '@/components/common/js/request'

export const reloadUser = ({commit}) => {
    request({url: '/api/user/index'}).then(res => {
        commit(types.SET_USER_INFO, res.data)
    })
}
export const addErrorLog = ({commit}, log) => {
    commit(types.ADD_ERROR_LOG, log)
}
