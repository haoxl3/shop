<template>
    <h1>首页</h1>
    <ul>
        <li v-for="(item, i) in hero">
            <h3>{{item.category}}</h3>
        </li>
    </ul>
</template>
<script setup>
import * as api from '../api/index';
import {reactive} from 'vue';
let result = await api.getHomepage();
// 数组变成响应式
const hero = reactive(result.hero);
</script>