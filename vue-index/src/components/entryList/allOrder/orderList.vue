<template>
    <div id="orderList">
        <van-tabs v-model="tabsIndex">
            <van-tab title="所有订单">
                <van-list v-model="allStatus.loading"
                          :finished="allStatus.finished"
                          @load="getAll()">
                    <div class="order-info" v-for="(item,index) in allList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="待接单">
                <van-list v-model="noPayStatus.loading"
                          :finished="noPayStatus.finished"
                          @load="getNopay()">
                    <div class="order-info" v-for="(item,index) in noPayList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="服务中">
                <van-list v-model="deliveryStatus.loading"
                          :finished="deliveryStatus.finished"
                          @load="getDelivery()">
                    <div class="order-info" v-for="(item,index) in deliveryList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="待付款">
                <van-list v-model="waitPayStatus.loading"
                          :finished="waitPayStatus.finished"
                          @load="getWaitPay()">
                    <div class="order-info" v-for="(item,index) in waitPayList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="待评价">
                <van-list v-model="getGoodsStatus.loading"
                          :finished="getGoodsStatus.finished"
                          @load="getGoods()">
                    <div class="order-info" v-for="(item,index) in getGoodsList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="已完成">
                <van-list v-model="returnsStatus.loading"
                          :finished="returnsStatus.finished"
                          @load="getReturns()">
                    <div class="order-info" v-for="(item,index) in returnsList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <button @click.stop="cancelOrder" v-if="item.status==0">取消订单</button>
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {Tab, Tabs, List, Dialog, Toast, Row, Col} from 'vant'
    import {getOrderList, delOrder, cancelOrder} from '@/api/orderList'
    import brief from './orderTmp/brief'

    export default {
        name: "orderList",
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [List.name]: List,
            [Row.name]: Row,
            [Col.name]: Col,
            brief
        },
        data() {
            return {
                cdn: process.env.CDN,
                tabsIndex: 0,
                statusText: ['待师傅接单中', '待师傅服务中', '服务中，待支付费用', '待评价', '已完成'],
                allStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                allList: [],
                noPayStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                noPayList: [],
                deliveryStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                deliveryList: [],
                getGoodsStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                getGoodsList: [],
                returnsStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                returnsList: [],
                waitPayStatus: {
                    loading: false,
                    finished: false,
                    page: 1,
                },
                waitPayList: [],
                getShopLogic: false,
            }
        },
        mounted() {
            this.$nextTick(function () {
                if (this.$route.query.type) {
                    this.tabsIndex = parseInt(this.$route.query.type) + 1
                }
            })
        },
        methods: {
            //所有订单列表
            getAll() {
                getOrderList({page: this.allStatus.page}).then(res => {
                    this.allList = this.allList.concat(res.data.data)
                    this.allStatus.loading = false
                    this.allStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.allStatus.finished = true
                    }
                })
            },
            //待接单列表
            getNopay() {
                getOrderList({status: 0, page: this.noPayStatus.page}).then(res => {
                    this.noPayList = this.noPayList.concat(res.data.data)
                    this.noPayStatus.loading = false
                    this.noPayStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.noPayStatus.finished = true
                    }
                })
            },
            //服务中列表
            getDelivery() {
                getOrderList({status: 1, page: this.deliveryStatus.page}).then(res => {
                    this.deliveryList = this.deliveryList.concat(res.data.data)
                    this.deliveryStatus.loading = false
                    this.deliveryStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.deliveryStatus.finished = true
                    }
                })
            },
            //待付款列表
            getWaitPay() {
                getOrderList({status: 2, page: this.waitPayStatus.page}).then(res => {
                    this.waitPayList = this.waitPayList.concat(res.data.data)
                    this.waitPayStatus.loading = false
                    this.waitPayStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.waitPayStatus.finished = true
                    }
                })
            },
            //待评价列表
            getGoods() {
                getOrderList({status: 3, page: this.getGoodsStatus.page}).then(res => {
                    this.getGoodsList = this.getGoodsList.concat(res.data.data)
                    this.getGoodsStatus.loading = false
                    this.getGoodsStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.getGoodsStatus.finished = true
                    }
                })
            },
            //已完成列表
            getReturns() {
                getOrderList({status: 4, page: this.returnsStatus.page}).then(res => {
                    this.returnsList = this.returnsList.concat(res.data.data)
                    this.returnsStatus.loading = false
                    this.returnsStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.returnsStatus.finished = true
                    }
                })
            },
            //删除订单
            delOrder(item) {
                Dialog.confirm({
                    title: '提示',
                    message: '删除订单后不可恢复，是否继续？'
                }).then(() => {
                    delOrder({id: item.id}).then((res) => {
                        Toast(res.msg)
                        if (res.status == 1) {
                            this.returnsStatus.page = 1
                            this.returnsList = []
                            this.getReturns()
                        }
                    })
                }).catch(() => {
                    // on cancel
                })
            },
            //取消订单
            cancelOrder(item, type) {
                Dialog.confirm({
                    title: '提示',
                    message: '确认取消订单？'
                }).then(() => {
                    cancelOrder({id: item.id}).then((res) => {
                        Toast(res.msg)
                        if (res.status == 1) {
                            if (type == 1) {
                                this.allList = []
                                this.allStatus.page = 1
                                this.getAll()
                            } else {
                                this.noPayList = []
                                this.noPayStatus.page = 1
                                this.getNopay()
                            }
                        }
                    })
                }).catch(() => {
                })
            },
            //跳转订单详情
            goDetail(item) {
                this.$router.push('/serverOrder?id=' + item.id)
            },
        }
    }
</script>

<style lang="less">
    #orderList {
        .positionFix(@bottom: 0);
        .van-tab {
            flex: 1;
        }
        .van-tabs__content {
            margin-top: 10px;
        }
        .order-info {
            background-color: #ffffff;
            margin-bottom: 10px;
            .brief {
                .status {
                    .remTwoParams(padding, 12, 10);
                    .ds-flex(@align: center;@justContent: space-between);
                    .status-text {
                        color: @themeColor;
                        .rem(font-size, 13);
                    }
                    button {
                        .rem(font-size, 12);
                        .remTwoParams(padding, 6, 12);
                        border-radius: 20px;
                        background-color: transparent;
                        border: 1px solid #e8e8e8;
                    }
                }
            }
        }
    }
</style>
