<template>
    <div id="makeFails">
        <div class="status-icon">
            <i class="van-icon van-icon-shibai"></i>
            <p class="status-text">预约失败</p>
        </div>
        <div class="reason">
            <p>预约失败原因：</p>
            <p>①请检查您的网络设置；</p>
            <p>②维修资料填写是否正确；</p>
        </div>
        <div class="btns">
            <button class="back-btn" @click="close">关闭</button>
            <button class="buy-btn" @click="back">返回重试</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fails",
        methods: {
            close() {
                this.$router.replace('/index')
            },
            back() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="less">
    #makeFails {
        .positionFix();
        .status-icon {
            text-align: center;
            .rem(margin-top, 50);
            .van-icon {
                .rem(font-size, 100);
                color: #666666;
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
