<template>
    <div id="reg-success">
        <img class="success_img" src="./reg-success.png" alt="">
        <h4>恭喜注册成功</h4>
        <div class="matter">
            <p>师傅重点注意事项:</p>
            <p>①订单仅支持线上收款;</p>
            <p>②订单完成后必须如实上报价钱，虚报价钱者重罚;</p>
            <p>③后台审核师傅注册资料时间为3-7个工作日，审
                核通过后，才能激活抢单功能(添加师傅状态变更
                提醒) ;</p>
            <p>④上门服务必须佩带工作证。</p>
        </div>
        <div class="bottom" @click="goMember">
            完 成
        </div>
    </div>
</template>

<script>
    export default {
        name: "regSuccess",
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
            padding: 40px 20px;
            p {
                .rem(font-size,15);
                color: #666666;
                .rem(line-height,25);
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
