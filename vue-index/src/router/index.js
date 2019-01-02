import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/components"),
            redirect: "/index",
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: () =>import('@/components/index/index'),
                    meta: {
                        title: "首页",
                        showBack: false,
                        showMore: false,
                        showTitle: true,
                        showBottom: true,
                        keepAlive: true
                    }
                },
                {
                    path: '/category',
                    name: 'category',
                    component: () =>import('@/components/category/index'),
                    meta: {
                        title: "全部服务",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/member',
                    name: 'member',
                    component: () =>import('@/components/member/index'),
                    meta: {
                        title: "个人中心",
                        showBack: false,
                        showMore: false,
                        showTitle: false,
                        showBottom: true
                    }
                },
                {
                    path: '/coupon',
                    name: 'coupon',
                    component: () =>import('@/components/entryList/cashCoupon/cashCoupon'),
                    meta: {
                        title: "代金券",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/couponCenter',
                    name: 'couponCenter',
                    component: () =>import('@/components/entryList/cashCoupon/getCenter'),
                    meta: {
                        title: "领券中心",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/serverDetail',
                    name: 'serverDetail',
                    component: () =>import('@/components/server/serverDetail'),
                    meta: {
                        title: "服务详情",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/serverInfo',
                    name: 'serverInfo',
                    component: () =>import('@/components/server/serverInfo'),
                    meta: {
                        title: "订单信息",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/fails',
                    name: 'fails',
                    component: () =>import('@/components/server/serverStatus/fails'),
                    meta: {
                        title: "预约失败",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/success',
                    name: 'success',
                    component: () =>import('@/components/server/serverStatus/success'),
                    meta: {
                        title: "预约成功",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/remainder',
                    name: 'remainder',
                    component: () =>import('@/components/entryList/remainder/index'),
                    meta: {
                        title: "消费明细",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/addressList',
                    name: 'addressList',
                    component: () =>import('@/components/entryList/address/addressList'),
                    meta: {
                        title: "选择地址",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/addAddress',
                    name: 'addAddress',
                    component: () =>import('@/components/entryList/address/addAddress'),
                    meta: {
                        title: "收货地址新增",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/editAddress',
                    name: 'editAddress',
                    component: () =>import('@/components/entryList/address/editAddress'),
                    meta: {
                        title: "收货地址修改",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/allOrder',
                    name: 'allOrder',
                    component: () =>import('@/components/entryList/allOrder/orderList'),
                    meta: {
                        title: "服务订单",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/cancelOrder',
                    name: 'cancelOrder',
                    component: () =>import('@/components/entryList/allOrder/cancelOrder'),
                    meta: {
                        title: "取消订单",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/serverOrder',
                    name: 'serverOrder',
                    component: () =>import('@/components/server/serverOrder'),
                    meta: {
                        title: "订单详情",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/addBank',
                    name: 'addBank',
                    component: () =>import('@/components/entryList/appCash/addBank'),
                    meta: {
                        title: "申请提现",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/myBank',
                    name: 'myBank',
                    component: () =>import('@/components/entryList/appCash/myBankList'),
                    meta: {
                        title: "选择银行卡",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/myFriend',
                    name: 'myFriend',
                    component: () =>import('@/components/entryList/friend/friend'),
                    meta: {
                        title: "我的伙伴",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/recharge',
                    name: 'recharge',
                    component: () =>import('@/components/entryList/recharge/index'),
                    meta: {
                        title: "在线充值",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/rechargeSuccess',
                    name: 'rechargeSuccess',
                    component: () =>import('@/components/entryList/recharge/rechargeSuccess'),
                    meta: {
                        title: "充值成功",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/shareQrCode',
                    name: 'shareQrCode',
                    component: () =>import('@/components/entryList/shareQrCode/shareQrCode'),
                    meta: {
                        title: "分享二维码",
                        showBack: true,
                        showMore: false,
                        showTitle: false,
                        showBottom: false
                    }
                },
                {
                    path: '/masterCenter',
                    name: 'masterCenter',
                    component: () =>import('@/components/entryList/masterCenter/index'),
                    meta: {
                        title: "师傅中心",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/masterOrder',
                    name: 'masterOrder',
                    component: () =>import('@/components/entryList/masterOrder/masterOrder'),
                    meta: {
                        title: "我的订单",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/mOrder',
                    name: 'mOrder',
                    component: () =>import('@/components/entryList/masterOrder/mOrderDetail'),
                    meta: {
                        title: "订单详情",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/repairEnd',
                    name: 'repairEnd',
                    component: () =>import('@/components/entryList/masterOrder/repairEnd'),
                    meta: {
                        title: "维修完毕结算",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/mcancelOrder',
                    name: 'mcancelOrder',
                    component: () =>import('@/components/entryList/masterOrder/cancelOrder'),
                    meta: {
                        title: "取消订单",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/editInfo',
                    name: 'editInfo',
                    component: () =>import('@/components/entryList/masterCenter/editInfo'),
                    meta: {
                        title: "编辑资料",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/income',
                    name: 'income',
                    component: () =>import('@/components/entryList/masterCenter/masterIncome'),
                    meta: {
                        title: "收入明细",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/masterReg',
                    name: 'masterReg',
                    component: () =>import('@/components/entryList/regMaster/reg'),
                    meta: {
                        title: "注册师傅",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false,
                        keepAlive: true
                    }
                },
                {
                    path: '/masterRegNext',
                    name: 'masterRegNext',
                    component: () =>import('@/components/entryList/regMaster/regNext'),
                    meta: {
                        title: "上传照片",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/masterRegSuccess',
                    name: 'masterRegSuccess',
                    component: () =>import('@/components/entryList/regMaster/regSuccess'),
                    meta: {
                        title: "注册成功",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/regAuditing',
                    name: 'regAuditing',
                    component: () =>import('@/components/entryList/regMaster/regAuditing'),
                    meta: {
                        title: "审核中",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/zixun',
                    name: 'zixun',
                    component: () =>import('@/components/entryList/zixun/index'),
                    meta: {
                        title: "平台资讯",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false,
                        keepAlive: true
                    }
                },
                {
                    path: '/zixunDetails',
                    name: 'zixunDetails',
                    component: () =>import('@/components/entryList/zixun/zixunDetails'),
                    meta: {
                        title: "平台资讯",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/kefu',
                    name: 'kefu',
                    component: () =>import('@/components/entryList/spa/kefu'),
                    meta: {
                        title: "客服中心",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/zzsm',
                    name: 'zzsm',
                    component: () =>import('@/components/entryList/spa/zzsm'),
                    meta: {
                        title: "郑重说明",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/yszc',
                    name: 'yszc',
                    component: () =>import('@/components/entryList/spa/yszc'),
                    meta: {
                        title: "隐私政策",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/zysx',
                    name: 'zysx',
                    component: () =>import('@/components/entryList/spa/zysx'),
                    meta: {
                        title: "注意事项",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                },
                {
                    path: '/fwlc',
                    name: 'fwlc',
                    component: () =>import('@/components/entryList/spa/fwlc'),
                    meta: {
                        title: "服务流程",
                        showBack: true,
                        showMore: false,
                        showTitle: true,
                        showBottom: false
                    }
                }
            ]
        },
        {
            path: "/404",
            name: "page404",
            component: () => import("@/components/error")
        }
    ]
})
