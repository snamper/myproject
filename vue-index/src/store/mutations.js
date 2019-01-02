import * as types from './mutation-types'

const mutations = {
    [types.SET_TITLE] (state, title) {
        state.title = title
    },
    [types.SET_SHOW_BACK] (state, flag) {
        state.showBack = flag
    },
    [types.SET_SHOW_TITLE] (state, flag) {
        state.showTitle = flag
    },
    [types.SET_SHOW_MORE] (state, flag) {
        state.showMore = flag
    },
    [types.SET_USER_INFO] (state, user) {
        state.user = user
    },
    [types.SET_SHOW_BOTTOM] (state, flag) {
        state.showBottom = flag
    },
    [types.SET_ADDRESS_ID] (state, addressId) {
        state.addressId = addressId
    },
    [types.SET_CART_NUM] (state, cartNum) {
        state.cartNum = cartNum
    },
    [types.ADD_ERROR_LOG] (state, log) {
        state.logs.push({message: log.err.message, stack: log.err.stack, url: log.url, info: log.info})
    }
}

export default mutations
