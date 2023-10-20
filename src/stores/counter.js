import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

//由于某些数据的特殊性，在很多组件中都有可能进行共享，共享的数据使用 Pinia 管理会更加方便
//遵循理念：和数据相关的所有操作（state + action）都放到 Pinia中，组件只负责触发action函数来获取数据