<template>
    <div id="app">
        <router-view></router-view>
        <div class="error-log" v-if="$route.query.debug">
            <div v-for="(item, key) in logs" :key="key">
                <p class="page-title">Message</p>
                <p>{{item.message}}</p>
                <p  class="page-title">Stack</p>
                <pre>{{item.stack}}</pre>
                <p  class="page-title">Hook</p>
                <p>{{item.info}}</p>
                <p  class="page-title">URL</p>
                <p>{{item.url}}</p>
                <hr>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'App',
        computed: {
            ...mapGetters(['logs'])
        },
    }
</script>

<style scoped>
    .page-title {
        font-size: 20px;
        color: red;
    }
    .error-log{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.9;
        background-color: #ccc;
        z-index: 9999999;
        overflow: scroll;
    }
</style>
