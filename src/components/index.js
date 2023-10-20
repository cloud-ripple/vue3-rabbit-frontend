 // 把 components 中的所有组件都进行全局化注册
 // 通过插件的方式 ,在 main.js中使用插件

 import ImageView from './ImageView/index.vue'
 import Sku from './SKU/index.vue'

 export const componentPlugin = {
  install(app) {
    // 注册全局组件 app.component('组件名字', 组件配置对象)
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
  }
 }
