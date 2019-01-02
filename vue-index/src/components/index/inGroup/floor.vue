<template>
    <pannel :hasTitle="false">
        <div class="floor" slot="list">
            <ul class="floor_box">
                <li class="item" v-for="cate in cateList" :key="cate.id" @click="goCate(cate)">
                    <div>
                        <div class="item_img">
                            <img v-lazy="cate.imgURL" alt="">
                        </div>
                        <p class="item_name">{{cate.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </pannel>
</template>

<script>
    import Pannel from 'common/base/pannel/pannel'
    import {Row, Col} from 'vant'

    export default {
        name: "icons",
        props: {
            cateList: {
                type: Array,
                default: []
            }
        },
        components: {
            Pannel,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        methods: {
            toCategory() {
                this.$router.push('/category')
            },
            goCate(item) {
                this.$router.push({path: '/category',query: {id: item.id}})
            }
        }
    }
</script>

<style scoped lang="less">
    .floor {
        height: 0;
        padding-bottom: 44%;
        width: 100%;
        background: #fff;
        position: relative;
        .floor_box {
            position: absolute;
            top: 8px;
            left: 5px;
            bottom: 8px;
            right: 5px;
            .ds-flex(@align: flex-start);
            .item {
                flex: 0 0 25%;
                height: 50%;
                background: #fff;
                overflow: hidden;
                .ds-flex(@direction: column,@justContent: center);
                .item_img {
                    .rem(width,40);
                    .rem(height,40);
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto;
                    position: relative;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                        display: block;
                        .positionCenter;
                    }
                }
                .item_name {
                    text-align: center;
                    .ellipsis;
                    .rem(line-height,22);
                    .rem(font-size,12);
                    color: #3f3f3f;
                    width: 100%;
                }
            }
        }
    }
</style>
