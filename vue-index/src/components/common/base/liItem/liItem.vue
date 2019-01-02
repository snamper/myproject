<template>
    <div class="pro_list" v-if="proList.length > 0">
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="60"
            @load="onLoad">
            <single :class="{'column': switchFlag === true}"  v-for="(item,index) in proList" :key="index">
                <img v-lazy="item.imgURL" slot="img">
                <h4 slot="title" class="title">{{item.title}}</h4>
                <p slot="pay_num" class="pay_num" v-if="item.pay_num && item.pay_num > 0">{{item.pay_num}}人付款</p>
                <p slot="price" class="price">
                    <span class="now_price">￥{{item.now_price}}</span>
                    <span class="old_price">￥{{item.old_price}}</span>
                </p>
            </single>
        </van-list>
    </div>
</template>

<script>
    import {List} from 'vant'
    import Single from 'common/base/liItem/single'

    export default {
        name: "liItem",
        props: {
            proList: {
                type: Array,
                default() {
                    return []
                }
            },
            switchFlag: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            }
        },
        components: {
            [List.name]: List,
            Single
        },
        methods: {
            onLoad() {
                this.$emit("load")
            }
        }
    }
</script>

<style scoped lang="less">
    .pro_list {
        overflow: hidden;
        .row {
            width: calc(~"50% - 15px");
            background: #fff;
            border-radius: 3px;
            margin-top: 10px;
            margin-left: 10px;
            float: left;
            overflow: hidden;
            &.column {
                width: calc(~"100% - 20px");
                margin: 10px auto;
                float: inherit;
                border-radius: 6px;
                /deep/.item {
                    .ds-flex(@direction: row,@wrap: nowrap,@align: stretch);
                    .img {
                        .padBox(@width:35.2%,@paddingBot: 35.2%);
                        margin-right: 10px;
                    }
                    .info {
                        flex: 1;
                        overflow: hidden;
                        .ds-flex(@direction: column,@wrap: nowrap,@justContent: space-between,@align: flex-start);
                    }
                }
            }
        }
    }
</style>
