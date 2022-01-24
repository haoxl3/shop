<template>
    <div class="header" :class="{hidden: store.state.isFullScreen}">
        <div class="logo" @click="router.push('/')">
            <img src="../assets/logo.png" alt="">
        </div>
        <a-input-search
            v-model:value="data.value"
            placeholder="搜索商品或商品号"
            class="input-search"
            @search="onSearch"
        />
        <a-menu v-model:selectedKeys="data.current" mode="horizontal">
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
                <a-menu-item-group title="购物商品">
                    <a-menu-item v-for="(item, i) in store.state.buycarts" :key="item.id">
                        <div class="prod-item">
                            <div class="left">
                                <img :src="item.imgsrc" alt="">
                            </div>
                            <div class="middle">
                                <div class="title">{{item.title}}</div>
                                <div class="content">
                                    <span class="num">数量：{{item.num}}</span>
                                    <div class="control">
                                        <span class="btn" @click.stop="store.commit('addBuycartsNum', i)">+</span>
                                        <span class="btn" @click.stop="store.commit('minusBuycartsNum', i)">-</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="price">￥{{item.price * item.num}}</div>
                            </div>
                        </div>
                    </a-menu-item>
                    <a-menu-item key="totalPrice">
                        <div class="total">
                            <span>总价：</span>
                            <span class="num">￥{{store.getters.totalPrice}}</span>
                        </div>
                    </a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script setup>
import {useRoute, useRouter} from 'vue-router';
import {reactive} from 'vue';
import {useStore} from 'vuex';
import {
    ShopOutlined,
    UserOutlined,
    CarOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const store = useStore();
const data = reactive({
    value: '',
    current: ['help']
});
const onSearch = () => {};
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
    transition: all .5s;
    &.hidden {
        transform: translate(0, -100%);
    }
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