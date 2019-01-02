<template>
    <div class="address">
        <div class="address_box">
            <i class="van-icon address_icon">&#xe6b3;</i>
            <div class="address_info">
                <div class="user_info">
                    <span v-if="showDefault">默认</span>
                    <p>
                        <span>{{addressInfo.post_name}}</span>
                        <span>{{addressInfo.post_tel}}</span>
                    </p>
                </div>
                <p class="address_details">
                    {{addressInfo.post_address}}
                </p>
            </div>
            <van-icon name="arrow" class="chose_icon" v-if="showIcon"></van-icon>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'vant'

    export default {
        name: "addressInfo",
        components: {
            [Icon.name]: Icon
        },
        props: {
            addressInfo: {
                type: Object,
                default: {
                    post_name: '',
                    post_tel: '',
                    post_address: '',
                },
            },
            showDefault: {
                type: Boolean,
                default: true,
            },
            showIcon: {
                type: Boolean,
                default: true,
            },
        }
    }
</script>

<style scoped lang="less">
    .address {
        .address_box {
            background: #ffffff;
            padding: 10px;
            .ds-flex(@wrap: nowrap,@justContent: space-between);
            .address_info {
                flex: 1;
                overflow: hidden;
                .rem(margin-left, 10);
                .user_info {
                    .ds-flex(@wrap: nowrap);
                    > span {
                        background: @themeColor;
                        color: #ffffff;
                        .rem(font-size, 12);
                        padding: 2px;
                        border-radius: 3px;
                        margin-right: 10px;
                    }
                    p {
                        flex: 1;
                        overflow: hidden;
                        color: #282828;
                        .rem(font-size, 15);
                        .rem(line-height, 16);
                        span {
                            margin-right: 10px;
                        }
                    }
                }
                .address_details {
                    color: #656565;
                    .rem(font-size, 15);
                    .rem(margin-top, 5);
                    .rem(line-height, 20);
                }
            }
            .address_icon {
                .rem(font-size, 26);
                color: #999999;
            }
            .chose_icon {
                color: #d8d8d8;
                .rem(font-size, 14);
            }
        }
    }
</style>
