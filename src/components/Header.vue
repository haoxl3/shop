<template>
    <div class="header">
        <div class="logo" @click="router.push('/')">
            <img src="../assets/logo.png" alt="">
        </div>
        <a-input-search
            v-model:value="data.value"
            placeholder="搜索商品或商品号"
            class="input-search"
            @search="onSearch"
        />
        <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item key="help">
            <template #icon>
                <question-circle-outlined />
            </template>
            帮助
            </a-menu-item>
            <a-menu-item key="salesroom">
            <template #icon>
                <ShopOutlined />
            </template>
            门店
            </a-menu-item>
            <a-sub-menu key="account">
                <template #icon>
                    <UserOutlined />
                </template>
                <template #title>账户</template>
            </a-sub-menu>
            <a-sub-menu key="buycart">
                <template #icon>
                    <CarOutlined />
                </template>
                <template #title>购物车</template>
                <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                </a-menu-item-group>
                <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script setup>
import {useRoute, useRouter} from 'vue-router';
import {reactive} from 'vue';
import {
    ShopOutlined,
    UserOutlined,
    CarOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const data = reactive({
    value: '',
    current: ['help']
});
</script>
<style lang="less">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10000;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
}
.logo {
    margin-right: 40px;
    img {
        height: 30px;
    }
}
.input-search {
    display: flex;
    flex: 1;
    height: 40px;
    align-items: center;
}
</style>