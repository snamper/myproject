<template>
    <div id="add_address">
        <van-address-edit
            :area-list="areaList"
            :show-delete="showDelete"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :address-info="addressInfo"
            save-button-text="保存地址"
            delete-button-text="删除地址"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
    import {AddressEdit, Toast} from 'vant'
    import areaList from 'common/js/area'
    import {addAddress, delAddress, getAddressDetail} from 'api/address'
    import store from "@/store/index"

    export default {
        name: "addAddress",
        beforeRouteEnter(to,from,next) {
            if (to.query.id) {
                to.meta.title = "收货地址编辑"
            } else {
                to.meta.title = "收货地址新增"
            }
            store.commit("SET_TITLE", to.meta.title)
            next()
        },
        data() {
            return {
                areaList,
                searchResult: [],
                params: {
                    id: '',
                    tel: '',
                    name: '',
                    address: '',
                    province: '',
                    city: '',
                    area: '',
                    is_default: false
                },
                addressInfo: {},
                showDelete: false
            }
        },
        mounted() {
            this.getAddressDetail()
        },
        methods: {
            onSave(content) {
                this.params.tel = content.tel
                this.params.address = content.addressDetail
                this.params.name = content.name
                this.params.is_default = content.isDefault
                this.params.area_code = content.areaCode
                this.params.province = content.areaCode.substr(0, 2) + '0000'
                this.params.city = content.areaCode.substr(0, 4) + '00'
                this.params.area = content.areaCode
                if (this.$route.query.id) {
                    this.params.id = this.$route.query.id
                }
                addAddress(this.params).then((res) => {
                    Toast({
                        duration: 0,
                        message: res.msg
                    })
                    if (res.status == 1) {
                        setTimeout(()=>{
                            Toast.clear()
                            if (this.$route.query.type == 1) {
                                this.$router.push('/orderPay')
                            } else {
                                this.$router.push('/addressList')
                            }
                        },500)
                    } else {
                        setTimeout(()=>{
                            Toast.clear()
                        },1000)
                    }
                })
            },
            onDelete() {
                delAddress({address_id: this.$route.query.id}).then((res)=>{
                    Toast(res.msg)
                    if (res.status == 1) {
                        this.$router.back()
                    }
                })
            },
            getAddressDetail() {
                if (this.$route.query.id) {
                    this.showDelete = true
                    getAddressDetail({address_id: this.$route.query.id}).then((res)=>{
                        if (res.data.is_default == 1) {
                            res.data.is_default = true
                        } else {
                            res.data.is_default = false
                        }
                        this.addressInfo = {
                            id: res.data.id,
                            tel: res.data.tel,
                            name: res.data.name,
                            province: res.data.province,
                            city: res.data.city,
                            county: res.data.area,
                            addressDetail: res.data.address,
                            isDefault: res.data.is_default,
                            areaCode: res.data.area_id.toString()
                        }
                    })
                }
            }
        },
        components: {
            [AddressEdit.name]: AddressEdit,
            [Toast.name]: Toast
        }
    }
</script>

<style scoped lang="less">
    #add_address {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        /deep/ .van-button {
            width: 50%;
            line-height: 1.133rem;
            height: 1.133rem;
            border-radius: 1rem;
            margin: 0.4rem auto;
            &.van-button--default {
                background: none;
                color: #333333;
                border-color: #d9d9d9;
            }
        }
        /deep/ .van-switch--on {
            background: @themeColor;
        }
    }
</style>
