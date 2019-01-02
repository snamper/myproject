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
                                <div>
                                    <button @click.stop="cancelOrder(item)" v-if="item.status==1">取消订单</button>
                                    <button v-if="item.status==4">11订单</button>
                                    <button class="confirm-btn" @click.stop="acceptOrder(item.id,1)"
                                            v-if="item.status==0">确认接单
                                    </button>
                                    <button class="confirm-btn"
                                            v-if="item.status==1||item.status==2" @click.stop=""><a
                                        :href="'tel:'+item.post_tel">联系客户</a>
                                    </button>
                                </div>
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
                                <button class="confirm-btn" @click.stop="acceptOrder(item.id)" v-if="item.status==0">
                                    确认接单
                                </button>
                            </div>
                        </brief>
                    </div>
                    <div v-if="noPayList.length<=0" class="no-img">
                        <img src="./noOrder.png" alt="暂无订单">
                        <p>暂时没有新订单~</p>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="进行中">
                <van-list v-model="deliveryStatus.loading"
                          :finished="deliveryStatus.finished"
                          @load="getDelivery()">
                    <div class="order-info" v-for="(item,index) in deliveryList" :key="index" @click="goDetail(item)">
                        <brief :info="item">
                            <div slot="status" class="status">
                                <span class="status-text">{{statusText[item.status]}}</span>
                                <div>
                                    <button @click.stop="cancelOrder(item)" v-if="item.status==1">取消订单</button>
                                    <button class="confirm-btn"
                                            v-if="item.status==1||item.status==2" @click.stop=""><a
                                        :href="'tel:'+item.post_tel">联系客户</a>
                                    </button>
                                </div>
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
                                <button class="confirm-btn"
                                        v-if="item.status==1||item.status==2" @click.stop=""><a
                                    :href="'tel:'+item.tel">联系客户</a>
                                </button>
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
                            </div>
                        </brief>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {Tab, Tabs, List, Dialog, Row, Col} from 'vant'
    import {getMasterOrder, acceptOrder} from '@/api/masterOrder'
    import brief from '../allOrder/orderTmp/brief'

    export default {
        name: "masterOrder",
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
                tabsIndex: 1,
                statusText: ['新订单', '进行中', '待付款', '', '已完成'],
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
                getMasterOrder({page: this.allStatus.page}).then(res => {
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
                getMasterOrder({status: 0, page: this.noPayStatus.page}).then(res => {
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
                getMasterOrder({status: 1, page: this.deliveryStatus.page}).then(res => {
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
                getMasterOrder({status: 2, page: this.waitPayStatus.page}).then(res => {
                    this.waitPayList = this.waitPayList.concat(res.data.data)
                    this.waitPayStatus.loading = false
                    this.waitPayStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.waitPayStatus.finished = true
                    }
                })
            },
            //已完成列表
            getReturns() {
                getMasterOrder({status: 4, page: this.returnsStatus.page}).then(res => {
                    this.returnsList = this.returnsList.concat(res.data.data)
                    this.returnsStatus.loading = false
                    this.returnsStatus.page++
                    if (res.data.current_page >= res.data.last_page) {
                        this.returnsStatus.finished = true
                    }
                })
            },
            //确认接单
            acceptOrder(id) {
                var _this = this
                Dialog.confirm({
                    title: '提示',
                    message: '确认接单？'
                }).then(() => {
                    acceptOrder({id: id}).then(res => {
                        _this.$toast(res.msg)
                        if (res.status == 1) {
                            this.noPayList = []
                            this.noPayStatus.page = 1
                            this.getNopay()
                            this.tabsIndex = 0
                        }
                    })
                }).catch(() => {
                })
            },
            //取消订单
            cancelOrder(item) {
                this.$router.push('/mcancelOrder?id=' + item.id)
            },
            //跳转订单详情
            goDetail(item) {
                this.$router.push('/mOrder?id=' + item.id)
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
                        color: #999999;
                        &.confirm-btn {
                            color: #ffffff;
                            background-color: @themeColor;
                            border-color: @themeColor;
                            a {
                                color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
        .no-img {
            text-align: center;
            margin-top: 100px;
            img {
                .rem(max-width, 154);
            }
            p {
                .rem(font-size, 15);
                margin-top: 10px;
            }
        }
    }
</style>
