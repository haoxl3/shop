<template>
    <div class="loading" v-show="data.isLoading">
        <Loading/>
    </div>
    <div class="product" v-show="!data.isLoading">
        <div class="prod-list" :class="{hidden: store.state.isFullScreen}">
            <h1><SketchOutlined/>产品推荐</h1>
            <div class="products">
                <div class="prod-item"
                    v-for="(prod, pi) in data.products"
                    @click="changeModel(prod, pi)"
                    :class="{active: pi === data.pIndex}"
                >
                    <div class="prod-title">{{prod.title}}</div>
                    <div class="img">
                        <img :src="prod.imgsrc" :alt="prod.title"/>
                    </div>
                    <a-button type="primary" block @click.stop="addBuycart(prod)"><ShoppingCartOutlined/>加入购物车</a-button>
                </div>
            </div>
        </div>
        <div class="scene-list" :class="{hidden: store.state.isFullScreen}">
            <h3><RadarChartOutlined/>切换使用场景</h3>
            <div class="scenes">
                <div class="scene-item" v-for="(sence, index) in data.scenes" @click="changeHdr(sence, index)">
                    <img :src="`./files/hdr/${sence}.jpg`" alt="" :class="{active: index === data.sceneIndex}">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {onMounted, reactive} from 'vue';
import * as api from '../api/index';
import Loading from '../components/Loading.vue';
import {SketchOutlined, RadarChartOutlined, ShoppingCartOutlined} from '@ant-design/icons-vue';
const route = useRoute();
const store = useStore();
const data = reactive({
    products: [],
    isLoading: true,
    scenes: [],
    pIndex: 0,
    sceneIndex: 0
});
onMounted(async () => {
    let result = await api.getProducts();
    console.log(result);
    data.isLoading = false;
    data.products = result.list;
    data.scenes = result.hdr;
});
function changeModel(prod, pI) {
    data.pIndex = pI;
}
function changeHdr(scene, index) {
    data.sceneIndex = index;
}
function addBuycart(prod) {
    let product = {...prod, num: 1};
    let index = 0;
    let isExist = store.state.buycarts.some((item, i) => {
        if (product.id === item.id) {
            index = i;
            return true;
        } else {
            return false;
        }
    });
    // 原商品存在则+1，否则push进一个新商品
    if (isExist) {
        store.commit('addBuycartsNum', index);
    } else {
        store.commit('addBuycarts', product);
    }
}
// 根据鼠标滚轮来设置是否全屏
window.addEventListener('mousewheel', e => {
    // 向下
    if (e.deltaY > 0) {
        store.commit('setFullScreen', true);
    }
    if (e.deltaY < 0) {
        store.commit('setFullScreen', false);
    }
});
</script>
<style lang="less" scoped>
.prod-list {
    width: 300px;
    height: 100vh;
    padding: 60px 0 0;
    position: fixed;
    z-index: 1000;
    transition: all .5s;
    background-color: rgba(255, 255, 255, .8);
    left: 0;
    top: 0;
    &.hidden {
        transform: translate(-100%, 0);
    }
    h1 {
        font-size: 20px;
        font-weight: 900;
        padding: 10px 25px 0;
    }
    .products {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .prod-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 250px;
            background-color: #fff;
            border-radius: 20px;
            overflow: hidden;
            margin: 10px 0;
            box-shadow: 5px 5px 10px #666;
            transition: all .3s;
            &:hover {
                transform: translate(0, -5px);
                box-shadow: 5px 5px 10px #666, 0 0 20px orangered;
            }
            &.active {
                box-shadow: 5px 5px 10px #666, 0 0 20px red;
            }
            img {
                width: 190px;
            }
            .prod-title {
                padding: 0 20px;
            }
        }
    }
}
.scene-list {
    width: 300px;
    height: 100vh;
    padding: 60px 0 0;
    position: fixed;
    z-index: 1000;
    transition: all .5s;
    background-color: rgba(255, 255, 255, .8);
    right: 0;
    top: 0;
    &.hidden {
        transform: translate(100%, 0);
    }
    h3 {
        font-size: 20px;
        font-weight: 900;
        padding: 0 30px;
    }
    .scenes {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .scene-item {
            padding: 6px 0;
            img {
                width: 250px;
                border-radius: 10px;
                box-shadow: 5px 5px 10px #666;
                transition: all .3s;
                &:hover {
                    transform: translate(0, -5px);
                }
                &.active {
                    box-shadow: 5px 5px 10px #666, 0 0 20px red;
                }
            }
        }
    }
}
</style>