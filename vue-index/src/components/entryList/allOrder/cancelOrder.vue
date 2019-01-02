<template>
    <div id="cancelOrder">
        <div class="large-icon">
            <i class="van-icon van-icon-zhongyaotixing_Pro"></i>
            <p class="text">选择取消订单的原因</p>
        </div>
        <div class="reason-list">
            <span class="reason-item" :class="item.checked?'active':''" @click="checkItem(item)"
                  v-for="(item,index) in reasons" :key="index">{{item.text}} <van-icon
                :name="item.checked?'checked':'check'"></van-icon></span>
        </div>
        <div class="ur-idea">
            <textarea v-model="memo" id="" cols="30" rows="10" placeholder="对此单还有其他意见，可在此输入您的想法"></textarea>
        </div>
        <button class="cancel" @click="cancel">取消订单</button>
    </div>
</template>

<script>
    import {Icon, Dialog} from 'vant'
    import {cancelOrder} from '@/api/orderList'

    export default {
        name: "cancelOrder",
        components: {
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                reasons: [
                    {text: '暂不需要', checked: false},
                    {text: '师傅无法上门', checked: false},
                    {text: '价格高', checked: false},
                    {text: '地址填写错误', checked: false},
                    {text: '其他', checked: false},
                ],
                memo: '',
            }
        },
        methods: {
            checkItem(item) {
                item.checked = !item.checked
            },
            //取消订单
            cancel() {
                var _this = this
                Dialog.confirm({
                    title: '提示',
                    message: '确认取消订单？'
                }).then(() => {
                    var params = {
                        id: _this.$route.query.id,
                        why: [],
                        memo: _this.memo,
                    }
                    //选择的原因添加到数组
                    _this.reasons.forEach(function (v) {
                        if (v.checked) {
                            params.why.push(v.text)
                        }
                    })
                    cancelOrder(params).then((res) => {
                        this.$toast(res.msg)
                        if (res.status == 1) {
                            setTimeout(function () {
                                _this.$router.go(-2)
                            }, 500)
                        }
                    })
                }).catch(() => {
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #cancelOrder {
        .positionFix(@bottom: 0);
        .large-icon {
            .rem(margin-bottom, 50);
            .van-icon {
                .rem(font-size, 100);
                color: #666666;
                display: block;
                .remTwoParams(margin, 40, 0);
                text-align: center;
            }
            .text {
                .rem(font-size, 20);
                color: #333333;
                text-align: center;
            }
        }
        .reason-list {
            .remTwoParams(padding, 0, 20);
            .ds-flex();
            .reason-item {
                border: 1px solid #e6e6e6;
                background-color: #ffffff;
                .remTwoParams(padding, 6, 8);
                margin-right: 10px;
                margin-bottom: 10px;
                border-radius: 4px;
                .rem(font-size, 13);
                color: #CCCCCC;
                .ds-flex();
                .van-icon {
                    margin-left: 10px;
                }
                &.active {
                    color: @themeColor;
                    border-color: @themeColor;
                }
            }
        }
        .ur-idea {
            .remTwoParams(padding, 0, 20);
            textarea {
                resize: none;
                border: 1px solid #e6e6e6;
                border-radius: 6px;
                .rem(padding, 10);
                box-sizing: border-box;
                width: 100%;
            }
        }
        .cancel {
            position: absolute;
            bottom: 0;
            background-color: @themeColor;
            border: none;
            color: #ffffff;
            width: 100%;
            line-height: 50px;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            .rem(font-size, 15);
        }
    }
</style>
