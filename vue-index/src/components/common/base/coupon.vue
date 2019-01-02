<template>
    <div class="coupons" :class="info.status!=0?'disabled':''" @click="changeCoupon(info)">
        <div class="condition">
            <span class="type">{{info.cate_id==0?'通用代金券':'上门安装服务费立减'}}<br/><small v-if="info.cate_id!=0">仅可用于{{info.cate.name}}</small></span>
            <span class="num">￥{{parseFloat(info.reduce).toFixed(0)}}</span>
            <slot name="kind"></slot>
        </div>
        <div class="time">{{info.exp_time}}前有效</div>
    </div>
</template>

<script>
    export default {
        name: "coupon",
        props: {
            status: {
                type: String,
                default: '',
            },
            info: {
                type: Object,
                default: () => {
                    return {
                        exp_time: '2017-06-01',
                    }
                }
            },
        },
        methods: {
            changeCoupon(item) {
                this.$emit('change', item)
            }
        }
    }
</script>

<style scoped lang="less">
    .coupons {
        box-shadow: 0 2px 2px #afafaf;
        margin-bottom: 10px;
        &.disabled {
            .condition {
                color: #999999;
                .num {
                    color: #999999;
                }
            }
        }
        .condition {
            background-color: #ffeee1;
            .ds-flex(@justContent: space-around);
            .rem(height, 85);
            .rem(padding-left, 10);
            .rem(padding-right, 10);
            .rem(font-size, 17);
            .type{
                small{
                    .rem(font-size, 12);
                    color: #999999;
                }
            }
            .num {
                .rem(font-size, 36);
                color: @themeColor;
            }
            .status {
                .rem(font-size, 15);
                .rem(width, 17);
                color: #999999;
                border: 1px solid #999999;
                padding: 4px 2px;
            }
        }
        .time {
            .rem(height, 40);
            .rem(line-height, 40);
            .rem(padding-left, 20);
            background-color: #f2f2f2;
            .rem(font-size, 12);
            position: relative;
            color: #999999;
            &:before, &:after {
                content: '';
                .rem(width, 20);
                .rem(height, 20);
                border-radius: 50%;
                background-color: @themeBgColor;
                position: absolute;
                .rem(bottom, 30);
            }
            &:before {
                .rem(left, -10);
                box-shadow: 2px 0 2px #afafaf;
            }
            &:after {
                .rem(right, -10);
                box-shadow: -2px 0 2px #afafaf;
            }
        }
    }
</style>
