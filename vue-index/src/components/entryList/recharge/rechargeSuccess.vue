<template>
    <div id="reg-success">
        <img class="success_img" src="./reg-success.png" alt="">
        <h4>充值成功</h4>
        <div class="matter">
            <van-cell title="充值方式" value="微信支付"></van-cell>
            <van-cell title="充值金额"  value="￥50"></van-cell>
        </div>
        <div class="bottom" @click="goMember">
            完 成
        </div>
    </div>
</template>

<script>
    import {Cell} from 'vant'
    export default {
        name: "rechargeSuccess",
        components: {
            [Cell.name]: Cell
        },
        methods: {
            goMember() {
                this.$router.replace('/member')
            }
        }
    }
</script>

<style scoped lang="less">
    #reg-success {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .success_img {
            display: block;
            .rem(margin-top,50);
            .rem(margin-bottom,40);
            .rem(width,100);
            margin-left: auto;
            margin-right: auto;
        }
        h4 {
            .rem(font-size,20);
            color: #333333;
            text-align: center;
        }
        .matter {
            .rem(margin-top,35);
            /deep/  .van-cell {
                .rem(font-size,14);
                .van-cell__title {
                    color: #666666;

                }
            }
        }
        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .rem(height,50);
            .rem(line-height,50);
            background: @themeColor;
            color: #ffffff;
            .rem(font-size,15);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            overflow: hidden;
            text-align: center;
        }
    }
</style>
