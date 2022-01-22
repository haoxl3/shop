<script setup>
import Header from './components/Header.vue';
import {useRoute, useRouter} from 'vue-router';
let route = useRoute();
let router = useRouter();
</script>

<template>
  <Header/>
  <router-view></router-view>
</template>

<style>
</style>
