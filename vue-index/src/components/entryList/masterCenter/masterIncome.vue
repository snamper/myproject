<template>
    <div id="remainder">
        <div class="header">
            <img src="./remainder_bg.png" alt="">
            <div class="my_money">
                <div class="rest_money">
                    <p class="name">收入总额 <span @click="toCash"><i class="van-icon van-icon-tixian"></i>申请提现</span></p>
                    <p class="num">￥{{total}}</p>
                </div>
                <div class="right">
                    <div class="right_box">
                        <p class="name">可提现金额</p>
                        <p class="num">￥<span>{{amoney}}</span></p>
                    </div>
                    <div class="right_box">
                        <p class="name">冻结金额</p>
                        <p class="num">￥<span>{{bmoney}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="60"
            @load="onLoad"
            class="prolist"
        >
            <div  v-if="moneyList.length > 0">
                <div class="item" v-for="item in moneyList" :key="item.id">
                    <div class="icon">
                        <span></span>
                    </div>
                    <div class="info">
                        <div class="left">
                            <p>{{type[item.type]}}</p>
                            <span>{{item.add_date}}</span>
                        </div>
                        <div class="right">
                            <p><span v-show="item.money > 0">+</span><span>{{item.money}}</span>({{money_type[item.money_type]}})</p>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <div class="default" v-if="moneyList.length == 0">
            <img src="./no_income.png" alt="">
            <p>您暂时没有收入明细呢~</p>
        </div>
    </div>
</template>

<script>
    import {getMoneyList} from 'api/remainder'
    import {List} from 'vant'
    export default {
        name: "remainder",
        components: {
            [List.name]: List
        },
        data() {
            return {
                amoney: 0,
                bmoney: 0,
                total: 0,
                moneyList: [],
                finished: false,
                loading: false,
                page: 1,
                money_type: ["其他方式","余额","冻结积分","微信支付","支付宝支付"],
                type: ["","订单支付","后台充值记录","同意提现","驳回提现","申请提现","转账转出","转账收入","提现 (未确认情况)","充值", "推荐消费奖励","维修费","维修服务费"]
            }
        },
        mounted() {

        },
        methods: {
            getMoneyList() {
                getMoneyList().then(res=>{
                    this.amoney = res.data.amoney
                    this.bmoney = res.data.bmoney
                    this.total = res.data.total
                    this.moneyList = res.data.list.data
                    this.page = parseInt(res.data.list.current_page) + 1
                })
            },
            onLoad() {
                const _this = this
                getMoneyList({page: this.page}).then(res=>{
                    this.amoney = res.data.amoney
                    this.bmoney = res.data.bmoney
                    this.total = res.data.total
                    this.moneyList = res.data.list.data
                    res.data.list.data.forEach((v)=>{
                        if (_this.page > 1) {
                            _this.moneyList.push(v)
                        }
                    })
                    this.loading = false
                    this.page = parseInt(res.data.list.current_page) + 1
                    if (res.data.list.current_page * res.data.list.per_page >= res.data.list.total) {
                        this.finished = true
                    }
                })
            },
            toCash() {
                this.$router.push("/myBank")
            }
        }
    }
</script>

<style scoped lang="less">
    #remainder {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .header {
            position: relative;
            >img {
                width: 100%;
                display: block;
            }
            .my_money {
                position: absolute;
                .rem(left,10);
                .rem(right,10);
                .rem(top,15);
                .rem(bottom,15);
                .ds-flex(@align: stretch,@justContent: space-between,@wrap: nowrap);
                .rest_money {
                    flex: 1;
                    overflow: hidden;
                    .ds-flex(@direction: column;@justContent: space-between;@align: flex-start);
                    border-right: 1px solid #ffffff;
                    .rem(padding-right,10);
                    p {
                        color: #ffffff;
                        width: 100%;
                        &.name {
                            .rem(font-size,13);
                            .rem(line-height,32);
                            .ds-flex(@justContent: space-between);
                            .van-icon-tixian {
                                .rem(font-size,13);
                                margin-right: 3px;
                            }
                        }
                        &.num {
                            .rem(font-size,24);
                            .rem(line-height,50);
                        }
                    }
                }
                .right {
                    flex: 1;
                    overflow: hidden;
                    .right_box {
                        height: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        &:first-child {
                            border-bottom: 1px solid #ffffff;
                            box-sizing: border-box;
                        }
                        p {
                            color: #ffffff;
                            .ellipsis;
                            &.name {
                                .rem(font-size,13);
                                .rem(line-height,20);
                            }
                            &.num {
                                text-align: center;
                                .rem(font-size,13);
                                .rem(line-height,20);
                                span {
                                    .rem(font-size,13);
                                    .rem(line-height,20);
                                }
                            }
                        }
                    }
                }
            }
        }
        .prolist {
            padding-top: 15px;
            padding-bottom: 15px;
        }
        .item {
            padding-left: 10px;
            .ds-flex(@wrap: nowrap;@align: stretch);
            overflow: visible;
            padding-bottom: 10px;
            &:first-child {
                .icon {
                    &:before {
                        content: '';
                        width: 7px;
                        height: 7px;
                        border-radius: 50%;
                        overflow: hidden;
                        position: absolute;
                        top: -7px;
                        left: 0;
                        background: @themeColor;
                    }
                }
            }
            &:last-child {
                padding-bottom: 0px;
            }
            .icon {
                width: 7px;
                margin-right: 3px;
                position: relative;
                &:after {
                    content: '';
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    bottom: -7px;
                    left: 0;
                    background: @themeColor;
                }
                span {
                    width: 1px;
                    height: calc(100% - 10px);
                    background: @themeColor;
                    margin: 5px auto 5px auto;
                    display: block;
                }
            }
            .info {
                background: #ffffff;
                flex: 1;
                overflow: hidden;
                padding: 10px;
                .ds-flex(@wrap: nowrap);
                .left {
                    flex: 1;
                    overflow: hidden;
                    line-height: 1.5;
                    p {
                        color: #333333;
                        .rem(font-size,14);
                        .ellipsis;
                    }
                    span {
                        display: block;
                        color: #999999;
                        .rem(font-size,12);
                    }
                }
                .right {
                    flex: 0 0 40%;
                    overflow: hidden;
                    p {
                        color: @themeColor;
                        .rem(font-size,12);
                        word-break: break-all;
                        span {
                            .rem(font-size,20);
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .default {
            img {
                display: block;
                .rem(width,160);
                .rem(margin-top,40);
                .rem(margin-bottom,20);
                margin-left: auto;
                margin-right: auto;
            }
            p {
                color: #666666;
                .rem(font-size,18);
                line-height: 1.4;
                text-align: center;
            }
        }
    }
</style>
