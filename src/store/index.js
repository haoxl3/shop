import {createStore} from 'vuex';
const store = createStore({
    state() {
        return {
            isFullScreen: false,
            buycarts: []
        };
    },
    mutations: {
        setFullScreen(state, payload) {
            state.isFullScreen = payload;
        },
        addBuycarts(state, payload) {
            state.buycarts.push(payload);
        },
        addBuycartsNum(state, payload) {
            state.buycarts[payload].num++;
        },
        minusBuycartsNum(state, payload) {
            state.buycarts[payload].num--;
            // 当个数减为0时直接删除
            if (state.buycarts[payload].num === 0) {
                state.buycarts.splice(payload, 1);
            }
        }
    },
    getters: {
        totalPrice(state) {
            let total = state.buycarts.reduce((pre, item) => {
                return pre + item.price * item.num;
            }, 0);
            return total;
        }
    }
});
export default store;