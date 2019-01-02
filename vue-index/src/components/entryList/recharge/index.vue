<template>
    <div id="recharge">
        <div class="recharge_box">
            <div class="money">
                <h5>充值金额</h5>
                <p class="num">￥<span>{{money}}</span></p>
            </div>
            <div class="money_list">
                <h5>选择金额</h5>
                <ul class="list_box">
                    <li class="item" :class="currentIndex == index ? 'active' : ''" v-for="(item, index) in list"
                        :key="index" @click="choseMoney(item,index)">
                        <div class="item_box">
                            <p class="num">￥<span>{{item.recharge}}</span></p>
                            <p class="give" v-show="item.reward > 0">送{{item.reward}}元</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom" @click="subRecharge">
            下 一 步
        </div>
    </div>
</template>

<script>
    import {getRechargeList, postRecharge} from 'api/recharge'

    export default {
        name: "index",
        data() {
            return {
                list: [],
                money: '',
                currentIndex: -1
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                getRechargeList().then((res) => {
                    if (res.status == 1) {
                        this.list = res.data
                    }
                })
            },
            choseMoney(item, index) {
                this.money = item.recharge
                this.currentIndex = index
            },
            subRecharge() {
                postRecharge({money: this.money}).then((res) => {
                    if (res.status == 1) {
                        console.log(res)
                    } else {
                        this.$toast(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #recharge {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .recharge_box {
            margin: 10px;
            .rem(padding, 30);
            background: #ffffff;
            .money {
                h5 {
                    color: #282828;
                    .rem(font-size, 14);
                    line-height: 2;
                }
                .num {
                    color: #282828;
                    .rem(font-size, 30);
                    .remTwoParams(padding, 20, 0);
                    margin: 0 10px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #f2f2f2;
                    span {
                        .rem(font-size, 50);
                        vertical-align: top;
                    }
                }
            }
            .money_list {
                margin-top: 15px;
                h5 {
                    .rem(font-size, 14);
                    .rem(line-height, 25);
                    color: @themeColor;
                }
                .list_box {
                    overflow: hidden;
                    .item {
                        width: 33.33%;
                        padding-bottom: 25.07%;
                        height: 0;
                        float: left;
                        position: relative;
                        &.active {
                            .item_box {
                                background: @themeColor;
                                .num {
                                    color: #ffffff;
                                }
                                .give {
                                    color: #ffffff;
                                }
                            }
                        }
                        .item_box {
                            position: absolute;
                            .rem(top, 10);
                            .rem(left, 10);
                            .rem(right, 10);
                            .rem(bottom, 10);
                            box-sizing: border-box;
                            border: 1px solid @themeColor;
                            border-radius: 5px;
                            overflow: hidden;
                            .ds-flex(@direction: column;@wrap: nowrap;@justContent: center);
                            .num {
                                color: @themeColor;
                                .rem(font-size, 15);
                                span {
                                    .rem(font-size, 24);
                                }
                            }
                            .give {
                                color: @themeColor;
                                .rem(font-size, 12);
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .rem(height, 50);
            .rem(line-height, 50);
            background: @themeColor;
            color: #ffffff;
            .rem(font-size, 15);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            overflow: hidden;
            text-align: center;
        }
    }
</style>
