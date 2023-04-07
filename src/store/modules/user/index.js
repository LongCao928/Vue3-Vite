import { ref, computed } from 'vue'
import { defineStore } from "pinia";

// defineStore 返回值可以进行任意命名，但最好使用 store 的名字。
// 同时以 use 开头， store 结尾。(比如：`useUserStore`，`useCartStore`，`useProductStore`)

// 第一个参数，要是一个独一无二的名字，这个名字也被用作 id，是必须传入的。
// 第二个参数可以接收两类值，Option 对象或 Setup 函数。

/*export const useUserStore = defineStore('user', {
    state: () => {
        return {
            age: 26
        }
    },
    getters: {
        double: (state) => state.age * 2
    },
    actions: {
        increment() {
            this.age++
        }
    }
})*/

export const useUserStore = defineStore('user', () => {
    // 在 Setup Store 中，ref() 就是 state 属性，computed() 就是 getters，function() 就是 actions。
    const age = ref(20)
    const double = computed(() => { return age.value * 2})
    function increment() {
        age.value++
    }
    return { age, double, increment }
})