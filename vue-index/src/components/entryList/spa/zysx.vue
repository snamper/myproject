<template>
    <div id="service" v-html="serviceInfo">
    </div>
</template>

<script>
    import {getZysx} from '@/api/spa'

    export default {
        name: "zysx",
        data() {
            return {
                serviceInfo: {},
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getServiceInfo()
            })
        },
        methods: {
            getServiceInfo() {
                getZysx().then(res => {
                    this.serviceInfo = res.data
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #service{
        .positionFix(@bottom: 0);
        background: @themeBgColor;
        min-height: @minHeight;
        .rem(padding,10);
        box-sizing: border-box;
        line-height: 1.8;
    }
</style>
