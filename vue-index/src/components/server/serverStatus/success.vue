<template>
    <div id="success">
        <div class="status-icon">
            <i class="van-icon van-icon-chenggong"></i>
            <p class="status-text">恭喜预约成功</p>
        </div>
        <div class="reason">
            <p>为保障服务质量：</p>
            <p>①请核实上门师傅工作证；</p>
            <p>②维修完成后，请在平台上支付订单费用；</p>
        </div>
        <div class="btns">
            <button class="back-btn" @click="close">关闭</button>
            <button class="buy-btn" @click="seeDetail">查看订单详情</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success",
        methods: {
            close() {
                this.$router.replace('/index')
            },
            seeDetail() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    #success{
        .positionFix();
        .status-icon {
            text-align: center;
            .rem(margin-top, 50);
            .van-icon {
                .rem(font-size, 100);
                color: @themeColor;
                display: block;
                margin: 0 auto 40px;
            }
            .status-text {
                color: #333333;
                .rem(font-size, 20);
            }
        }
        .reason {
            .remTwoParams(padding, 0, 20);
            .rem(margin-top, 30);
            p {
                .rem(font-size, 15);
                line-height: 1.8;
            }
        }
        .btns {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 0;
            border-top: 1px solid #e6e6e6;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            overflow: hidden;
            button {
                width: 50%;
                border: none;
                .rem(font-size, 15);
                .rem(line-height, 50);
                &.back-btn {
                    background-color: #ffffff;
                }
                &.buy-btn {
                    color: #ffffff;
                    background-color: @themeColor;
                }
            }
        }
    }
</style>
