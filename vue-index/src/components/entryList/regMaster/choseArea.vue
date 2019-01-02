<template>
    <div id="choseArea">
        <div class="chose_box">
            <van-radio-group v-model="choseProvince" class="choseArea" v-show="choseProvince.length == 0">
                <van-cell-group>
                    <van-cell v-for="(item, index) in province" :key="item.value" :title="item.name" clickable
                              @click="getProvince(item,index)">
                        <van-radio :name="index"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-radio-group v-model="choseCity" class="choseArea" v-show="choseCity.length == 0">
                <van-cell-group>
                    <van-cell v-for="(item, index) in cityList" :key="item.value" :title="item.name" clickable
                              @click="getCity(item,index)">
                        <van-radio :name="index"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-checkbox-group v-show="areaList.length > 0" class="choseArea">
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in areaList"
                        clickable
                        :key="index"
                        :title="item.name"
                        @click.native="toggle(item,index)">
                        <i
                            slot="right-icon"
                            class="van-icon"
                            :class="item.checked ? 'van-icon-checks' : ''"
                        ></i>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </div>
        <div class="choseBtn" v-show="areaList.length > 0" @click="finishChose">
            <p>完 成</p>
        </div>
    </div>
</template>

<script>
    import AreaList from "common/js/area"
    import {RadioGroup, Radio, Cell, CellGroup, Checkbox, CheckboxGroup} from 'vant'

    export default {
        name: "choseArea",
        components: {
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup
        },
        data() {
            return {
                choseProvince: '',
                choseCity: '',
                choseCountry: [],
                cityCode: '',
                cityList: [],
                areaCode: '',
                areaList: [],
                server_address_id: [],
                allIndex: ''
            }
        },
        props: ['list'],
        computed: {
            province() {
                const Array = []
                Object.keys(AreaList.province_list).forEach((v, i) => {
                    Array[i] = {}
                    Array[i].value = v
                    Array[i].name = AreaList.province_list[v]
                })
                return Array
            }
        },
        methods: {
            getProvince(item, index) {
                this.choseProvince = index
                this.cityList = []
                this.cityCode = item.value.substr(0, 2)
                const Array = []
                const _this = this
                Object.keys(AreaList.city_list).forEach((v, i) => {
                    if (v.substr(0, 2) == _this.cityCode) {
                        Array[i] = {}
                        Array[i].value = v
                        Array[i].name = AreaList.city_list[v]
                        _this.cityList.push(Array[i])
                    }
                })
            },
            getCity(item, index) {
                this.choseCity = index
                this.areaList = []
                this.areaCode = item.value.substr(0, 4)
                const Array = []
                const _this = this
                Object.keys(AreaList.county_list).forEach((v, i) => {
                    if (v.substr(0, 4) == _this.areaCode) {
                        Array[i] = {}
                        Array[i].value = v
                        Array[i].name = AreaList.county_list[v]
                        Array[i].checked = false
                        _this.areaList.push(Array[i])
                    }
                })
                const allArea = {
                    name: "全" + item.name,
                    value: item.value,
                    checked: false
                }
                this.areaList.push(allArea)
            },
            toggle(item, index) {
                item.checked = !item.checked
                if (index == this.areaList.length - 1) {
                    this.areaList.forEach((v, i) => {
                        if (i < index) {
                            this.$set(this.areaList[i], 'checked', false)
                        }
                    })
                } else {
                    this.areaList[this.areaList.length - 1].checked = false
                }
                this.server_address_id = []
                this.areaList.forEach((v) => {
                    if (v.checked == true) {
                        this.server_address_id.push(v)
                    }
                })
            },
            finishChose() {
                this.choseProvince = ''
                this.choseCity = ''
                this.areaList = []
                this.choseCountry = []
                this.$route.meta.title = "注册师傅"
                this.$route.meta.showBack = true
                this.$store.commit("SET_TITLE", this.$route.meta.title)
                this.$store.commit("SET_SHOW_BACK",this.$route.meta.showBack)
                this.$emit('choseAreas', this.server_address_id)
            }
        }
    }
</script>

<style scoped lang="less">
    #choseArea {
        .positionFix(@top: 0,@bottom: 0);
        background: #ffffff;
        z-index: 10;
        .chose_box {
            .rem(padding-bottom, 60);
            .choseArea {
                /deep/ .van-icon-check:before {
                    content: '';
                }
                /deep/ .van-icon-checked:before {
                    content: '\e616';
                }
                /deep/ .van-icon {
                    font-size: 0.48rem;
                }
                /deep/ .van-radio__input {
                    height: 100%;
                }
                /deep/ .van-icon-checks {
                    color: @themeColor;
                }
                /deep/ .van-cell {
                    .rem(font-size, 13);
                }
            }
        }
        .choseBtn {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .rem(height, 50);
            .rem(line-height, 50);
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background-color: @themeColor;
            p {
                color: #ffffff;
                .rem(font-size, 15);
            }
        }
    }
</style>
