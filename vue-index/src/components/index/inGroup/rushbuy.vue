<template>
    <pannel titleLeft="限时特惠" titleRight="准点开抢" class="rush">
        <div slot="bot">
            <count-down class="count_down" :currentTime="rush.current" :startTime="rush.start" :endTime="rush.end" :tipText="'活动尚未开始哟'" :endText="'活动已结束'" :dayTxt="'天'" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
        </div>
        <ul class="rush_box" slot="list">
            <li class="rush_item" v-for="item in rushList" :key="item.id" @click="toProdetails(item)">
                <div class="img">
                    <img v-lazy="cdn + item.imgURL" alt="">
                </div>
                <div class="info">
                    <h4>{{item.name}}</h4>
                    <p class="now_price">￥{{item.seller_price}}</p>
                </div>
            </li>
        </ul>
    </pannel>
</template>

<script>
    import Pannel from 'common/base/pannel/pannel'
    import CountDown from 'vue2-countdown'

    export default {
        name: "hot-sell",
        data() {
            return {
                cdn: process.env.CDN
            }
        },
        props: {
            rushList: {
                type: Array,
                default: []
            },
            rush: {
                type: Object,
                default() {
                    return {
                        current: 1540797182,
                        start: 1540796182,
                        end: 1540819182
                    }
                }
            }
        },
        methods: {
            toProdetails(item) {
                this.$router.push({path: '/prodetails',query: {id: item.id}})
            }
        },
        components: {
            Pannel,
            CountDown
        }
    }
</script>

<style scoped lang="less">
    .rush {
        margin-top: 10px;
        background: #ffffff;
        .count_down {
            height: 0.58rem;
            line-height: 0.58rem;
            text-align: center;
            /deep/ span {
                color: #000000;
                background: #ffffff;
                margin: 0 2px;
                padding: 2px;
                border: 1px solid #000000;
                border-radius: 3px;
                &:nth-last-child(2) {
                    color: @themeColor;
                }
                &:first-child {
                    i {
                        color: #333;
                    }
                    span {
                        background: #ffffff;
                        border: none;
                        padding: 0;
                        &:nth-last-child(2) {
                            color: #000000;
                        }
                    }
                }
            }
        }
        .rush_box {
            width: 100%;
            overflow: hidden;
            border-top: 1px solid #d9d9d9;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            .rush_item {
                margin: 10px 0 10px 10px;
                &:last-child {
                    margin-right: 10px;
                }
                .rem(width,100);
                display: inline-block;
                border: 1px solid #d9d9d9;
                .img {
                    .padBox;
                    overflow: hidden;
                    img {
                        .positionCenter;
                        max-width: 100%;
                        max-height: 100%;
                        display: block;
                    }
                }
                .info {
                    background: #f5f5f5;
                    padding: 5px;
                    h4 {
                        color: #333333;
                        .rem(font-size,12);
                        .rem(line-height,20);
                        .ellipsis;
                    }
                    .now_price {
                        .rem(font-size,15);
                        color: @themeColor;
                        .rem(line-height,20);
                    }
                    .old_price {
                        .rem(font-size,12);
                        color: #999999;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>

