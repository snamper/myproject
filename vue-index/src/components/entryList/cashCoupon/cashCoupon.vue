<template>
    <div id="cashCoupon">
        <van-cell title="前往领券中心" is-link class="get-coupon" @click.native="goGetCoupon"/>
        <div class="coupon-list" v-for="(item,index) in couponList" :key="index">
            <coupon :info="item">
                <span slot="kind" class="status" v-if="item.status!=0">{{item.status==1?"已使用":"已过期"}}</span>
            </coupon>
        </div>
    </div>
</template>

<script>
    import {Cell} from 'vant'
    import request from '@/components/common/js/request'
    import coupon from '@/components/common/base/coupon'

    export default {
        name: "cashCoupon",
        data() {
            return {
                couponList: [],
            }
        },
        components: {
            coupon,
            [Cell.name]: Cell
        },
        mounted() {
            this.$nextTick(function () {
                this.initList()
            })
        },
        methods: {
            initList() {
                var _this = this
                request({
                    url: '/api/Reduce/index',
                    method: 'get',
                }).then(res => {
                    if (res.status == 1) {
                        res.data.forEach(function (v) {
                            var a = _this.timeDiffer(v.exp_time)
                            if (a && v.status != 1) {
                                v.status = 2
                            }
                        })
                        this.couponList = res.data
                    }
                })
            },
            timeDiffer(time) {
                var now = Date.parse(new Date()) + 24 * 60 * 60 * 1000
                var couponDate = Date.parse(new Date(time))
                var isBeMore = 0
                if ((now - couponDate) > 0) {
                    isBeMore = 1
                }
                return isBeMore
            },
            goGetCoupon() {
                this.$router.push('/couponCenter')
            }
        }
    }
</script>

<style scoped lang="less">
    #cashCoupon {
        .positionFix(@bottom: 0);
        .rem(padding, 10);
        .get-coupon {
            margin-bottom: 10px;
        }
    }
</style>
