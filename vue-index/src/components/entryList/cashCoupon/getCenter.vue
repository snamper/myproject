<template>
    <div id="couponCenter">
        <div class="coupon-list" v-for="(item,index) in canGetList" :key="index">
            <coupon :info="item">
                <button slot="kind" style="font-size: 12px" class="get-btn" @click="getIt(item.id)">立即领取</button>
            </coupon>
        </div>
        <div class="no-coupon" v-if="canGetList.length<=0">
            <img src="./noCoupon.png" alt="">
            <p class="text">暂无优惠券可以领取~</p>
        </div>
    </div>
</template>

<script>
    import request from '@/components/common/js/request'
    import coupon from '@/components/common/base/coupon'

    export default {
        name: "getCenter",
        components: {
            coupon
        },
        data() {
            return {
                canGetList: []
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initList()
            })
        },
        methods: {
            initList() {
                request({
                    url: '/api/Reduce/getList',
                    method: 'get'
                }).then(res => {
                    if (res.status == 1) {
                        this.canGetList = res.data
                    }
                })
            },
            //领取
            getIt(id) {
                request({
                    url: '/api/Reduce/getReduce',
                    method: 'post',
                    data: {id: id}
                }).then(res => {
                    this.$toast(res.msg)
                    if (res.status == 1) {
                        this.initList()
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #couponCenter {
        .positionFix(@bottom: 0);
        .rem(padding, 10);
        .get-btn {
            background-color: #ffaa33;
            color: #ffffff;
            border: none;
            .rem(font-size, 12);
            .rem(border-radius, 4);
            .remTwoParams(padding, 8, 4);
        }
        .no-coupon{
            text-align: center;
            margin-top: 50px;
            img{
                .rem(max-width,154)
            }
            .text{
                margin-top: 20px;
                .rem(font-size,14)
            }
        }
    }
</style>
