<template>
    <div id="addBank" v-if="!showNext">
        <van-cell-group>
            <van-field v-model="bankInfo.bank_user" clearable label="户名" required placeholder="请输入提现银行卡户名"/>
            <van-field v-model="bankInfo.bank_account" clearable label="银行卡号" placeholder="请输入正确的银行卡号" type="number"/>
            <van-cell :value="bankInfo.bank_name" is-link @click="showBankPick=true">
                <template slot="title" style="width: 2.4rem;">
                    <span class="van-cell-text">银行</span>
                </template>
            </van-cell>
            <van-field v-model="bankInfo.bank_address" clearable label="开户行" placeholder="请输入开户行"/>
        </van-cell-group>
        <van-popup v-model="showBankPick" position="bottom">
            <van-picker :columns="bankList" title="选择银行" show-toolbar @confirm="onConfirm"
                        @cancel="onCancel"/>
        </van-popup>
        <van-button class="next" @click="next()">添加</van-button>
    </div>
    <div id="appCash" v-else>
        <van-row class="which-bank">
            <van-col span="2" class="bank-icon">
                <img src="./bankIcon.png" alt="">
            </van-col>
            <van-col span="22" class="bank-info">
                <p class="bank-name">{{getBank.bank_name}}</p>
                <p class="bank-dec">尾号<span class="last-num" v-if="getBank.bank_account">{{getBank.bank_account.substr(-4,4)}}</span> 储蓄卡</p>
            </van-col>
        </van-row>
        <div class="money-num">
            <div class="title">提现金额</div>
            <div class="num-input">
                ￥<input type="number" placeholder="请输入提现金额" v-model="money">
            </div>
            <div class="balance">余额：￥{{user.amoney}}</div>
        </div>
        <!--<div class="ps">ps：提现金额只能以一百的整数提现，扣除手续费{{fee}}%</div>-->
        <van-button class="confirm-cash" @click="appCash">确认提现</van-button>
    </div>
</template>

<script>
    import {Field, Cell, CellGroup, Popup, Picker, Button, Row, Col,} from 'vant'
    import {bankList, postAppCash, getCharge, addBank, bankInfo} from '@/api/appCash'
    import {mapGetters} from 'vuex'

    export default {
        name: "addBank",
        components: {
            [Field.name]: Field,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data() {
            return {
                bankInfo: {
                    bank_user: '',
                    bank_account: '',
                    bank_name: '',
                    bank_address: '',
                    bank_info_id: 0,
                },
                money: '',
                showBankPick: false,
                bankList: [
                    {id: 1, text: '中国银行'},
                    {id: 2, text: '工商银行'},
                ],
                showNext: false,
                fee: 0,
                getBank: {},
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            this.$nextTick(function () {
                if (this.$route.query.type == 1) {
                    this.showNext = true
                    getCharge().then(res => { //获取手续费
                        this.fee = res.data.fee
                    })
                    this.getBankInfo()
                } else {
                    this.getBankList()
                }
            })
        },
        methods: {
            getBankList() {
                bankList().then(res => {
                    res.data.forEach(function (v) {
                        v.text = v.name
                    })
                    this.bankList = res.data
                    this.bankInfo.bank_name = this.bankList[0].text
                    this.bankInfo.bank_info_id = this.bankList[0].id
                })
            },
            getBankInfo() {
                bankInfo({id: this.$route.query.id}).then(res => {
                    if (res.status == 1) {
                        this.getBank = res.data
                    }
                })
            },
            onConfirm(value) {
                this.bankInfo.bank_name = value.name
                this.showBankPick = !this.showBankPick
                this.bankInfo.bank_info_id = value.id
            },
            onCancel() {
                this.showBankPick = !this.showBankPick
            },
            next() {
                if (this.bankInfo.bank_user == '') {
                    this.$toast('请输入户名')
                    return
                } else if (this.bankInfo.bank_account == '') {
                    this.$toast('请输入银行卡号')
                    return
                } else if (this.bankInfo.bank_address == '') {
                    this.$toast('请输入开户行')
                    return
                }
                addBank(this.bankInfo).then(res => {
                    if (res.status == 1) {
                        this.$router.back()
                    } else {
                        this.$toast(res.msg)
                    }
                })
            },
            appCash() {
                postAppCash({bank_id: this.$route.query.id, money: this.money}).then(res => {
                    this.$toast(res.msg)
                    if (res.status == 1) {
                        setTimeout(function () {
                            this.$router.replace('/income')
                        }, 1500)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    #addBank {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .rem(padding-bottom,50);
        .van-cell {
            .van-cell__title {
                max-width: 2.4rem !important;
            }
            .van-cell__value {
                text-align: left;
            }
        }
        .next {
            width: 55%;
            margin: 0 auto;
            display: block;
            margin-top: 40px;
            .rem(border-radius, 22)
        }
    }

    #appCash {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        .which-bank {
            display: flex;
            .remTwoParams(padding, 20, 10);
            align-items: center;
            background-color: #ffffff;
            margin-top: 10px;
            .bank-icon {
                img {
                    width: 100%;
                }
            }
            .bank-info {
                padding-left: 10px;
                .bank-name {
                    color: #333333;
                    .rem(font-size, 14);
                    margin-bottom: 6px;
                }
                .bank-dec {
                    .rem(font-size, 12);
                    color: #666666;
                }
            }
        }
        .money-num {
            background-color: #ffffff;
            margin-top: 10px;
            .remTwoParams(padding, 20, 10);
            .title {
                .rem(font-size, 14);
                color: #666666;
            }
            .num-input {
                .remTwoParams(padding, 15, 0);
                .rem(font-size, 30);
                color: #333333;
                display: flex;
                align-items: center;
                position: relative;
                input {
                    border: none;
                    flex: 1;
                    &::placeholder {
                        .rem(font-size,16);
                        color: #999999;
                    }
                }
                &::after {
                    content: '';
                    position: absolute;
                    height: 1px;
                    width: calc(~"100% + 20px");
                    background-color: #e5e5e5;
                    bottom: 0;
                    left: -10px;
                }
            }
            .balance {
                .rem(padding-top, 20);
                .rem(font-size, 13);
                color: #666666;
            }
        }
        .ps {
            color: @themeColor;
            .rem(font-size, 12);
            .rem(padding, 10);
        }
        .confirm-cash {
            display: block;
            margin: 20px auto 0;
            width: 55%;
            .rem(border-radius, 22)
        }
    }
</style>
