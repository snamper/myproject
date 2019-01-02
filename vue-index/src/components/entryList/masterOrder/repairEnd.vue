<template>
    <div id="repairEnd">
        <div>
            <h3 class="title">实际维修费用</h3>
            <van-cell-group>
                <van-field label="项目" disabled :value="name" />
                <van-field label="服务费" v-model="server_money" placeholder="请输入服务费" />
                <van-field label="材料费" v-model="material_money" placeholder="请输入材料费" />
            </van-cell-group>
        </div>
        <div>
            <h3 class="title">费用结算须知</h3>
            <div class="text">
                <p class="one">1.请按照实际费用填写，完成订单金额会纳入师傅绩效评
                    定;</p>
                <p class="two">2.结算过程中如发生欺诈行为，一经发现，从严处理。</p>
            </div>
        </div>
        <div class="btns">
            <button type="button" class="back-btn" @click="goBack">返回</button>
            <button type="button" class="buy-btn" @click="subInfo">提交</button>
        </div>
    </div>
</template>

<script>
    import {Field, CellGroup} from 'vant'
    import {OrderFinish} from 'api/masterOrder'
    export default {
        name: "repairEnd",
        components: {
            [Field.name]: Field,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                server_money: '',
                material_money: '',
                name: ''
            }
        },
        mounted() {
            this.name = this.$route.query.name
        },
        methods: {
            goBack() {
                this.$router.back()
            },
            subInfo() {
                const params = {
                    id: this.$route.query.id,
                    server_money: this.server_money,
                    material_money: this.material_money
                }
                const _this = this
                OrderFinish(params).then((res)=>{
                    this.$toast(res.msg)
                    if (res.status == 1) {
                        setTimeout(()=>{
                            _this.$router.back()
                        },500)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #repairEnd{
        .positionFix();
        .title{
            .rem(font-size,12);
            .rem(padding,10);
        }
        /deep/ .van-cell {
            .rem(font-size,14);
        }
        /deep/ .van-field__control {
            &::placeholder {
                color: #cccccc;
            }
        }
        .text {
            .rem(font-size,14);
            .rem(padding,10);
            background: #ffffff;
            p {
                .rem(line-height,23);
                color: #333333;
                &.two {
                    color: @themeColor;
                }
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
            .ds-flex();
            button {
                flex: 1;
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
