<template>
    <suspense>
        <template #fallback>
            <div class="loading">
                <Loading/>
            </div>
        </template>
        <template #default>
            <h1><HomeAsync/></h1>
        </template>
    </suspense>
</template>
<script setup>
import Loading from '../components/Loading.vue';
import {onMounted, defineAsyncComponent} from 'vue';
const HomeAsync = defineAsyncComponent(() => import('../components/HomeCom.vue'));
onMounted(async() => {
    
})
</script>