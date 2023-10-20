import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入封装的图片懒加载插件
import { lazyPlugin } from '@/plugins/imgLazy'

import App from './App.vue'
import router from './router'

// 引入初始化的样式文件，直接生效
import '@/styles/common.scss'
// 引入全局组件插件
import { componentPlugin } from '@/components/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//使用自己的懒加载插件，并给该插件对象中的 install()方法中传入app实例参数
app.use(lazyPlugin, 666, 777) //use方法 参数1：插件对象  参数2: ...options

// src/components 目录下有可能还会有很多其它项目通用型组件，有可能在多个业务模块中共享，统一进行全局组件注册
app.use(componentPlugin)

app.mount('#app')
