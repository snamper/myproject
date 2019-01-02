<template>
    <div id="address_list">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
        />
        <div class="default" v-if="list.length == 0">
            <img src="./no-address.png" alt="">
            <p>您还没有添加过地址哦~</p>
        </div>
    </div>
</template>

<script>
    import {AddressList, Toast} from 'vant'
    import {getAddressList, setDefault} from 'api/address'

    export default {
        name: "addressList",
        data() {
            return {
                chosenAddressId: '',
                list: [],
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            onAdd() {
                this.$router.push('/addAddress')
            },
            onEdit(item) {
                this.$router.push({path: '/addAddress', query: {id: item.id}})
            },
            onSelect(item) {
                setDefault({address_id: item.id}).then((res)=>{
                    if (res.status == 1) {
                        if (this.$route.query.type) {
                            this.$router.back()
                        } else {
                            Toast(res.msg)
                        }
                    } else {
                        Toast(res.msg)
                        this.$router.go(-1)
                    }
                })
            },
            getList() {
                const _this = this
                this.list = []
                getAddressList().then((res)=>{
                    res.data.forEach((v,i)=>{
                        if (v.city == v.province) {
                            v.city = ''
                        }
                        if (!v.area) {
                            v.area = ''
                        }
                        v.address = v.province + v.city + v.area + v.address
                        if (v.is_default == 1) {
                            _this.chosenAddressId = v.id
                        }
                        _this.list.push(v)
                    })
                })
            }
        },
        components: {
            [AddressList.name]: AddressList,
            [Toast.name]: Toast
        }
    }
</script>

<style scoped lang="less">
    #address_list {
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        /deep/ .van-radio-group {
            .rem(padding-bottom, 60);
        }
        .default {
            img {
                display: block;
                .rem(width,160);
                .rem(margin-top,40);
                .rem(margin-bottom,20);
                margin-left: auto;
                margin-right: auto;
            }
            p {
                color: #666666;
                .rem(font-size,18);
                line-height: 1.4;
                text-align: center;
            }
        }
    }
</style>
