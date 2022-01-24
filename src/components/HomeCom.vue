<template>
    <div class="home-page">
        <HomeSwiper :banner="data.banner"/>
    </div>
</template>
<script setup>
import * as api from '../api/index';
import HomeSwiper from '../components/Home/HomeSwiper.vue';
import {reactive} from 'vue';
let result = await api.getHomepage();
// 数组变成响应式
const data = reactive({banner: result.banner});
</script>
<style lang="less" scoped>
.home-page {
    padding-top: 46px;
    height: 575px;
    position: relative;
}
</style>