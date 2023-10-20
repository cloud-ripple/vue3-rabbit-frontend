/**
 createRouter: 创建router实例对象
 createWebHistory: 创建 history模式的路由
 */

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由
    {
      path: '/', //主页
      component: Layout,
      // 二级路由
      children: [
        {
          path: '', //当访问路径默认为空时，该组件页面也会展示
          component: Home
        },
        {
          name: 'fenlei', // 一级分类
          path: 'category/:id',
          component: Category
        },
        {
          name: 'subCategory', //二级分类
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          name: 'detail', //首页中的商品详情
          path: 'detail/:id',
          component: Detail
        }
      ]
    },
    {
      path: '/login', //登录页
      component: Login
    }
  ],
  // 路由滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }  // 在路由切换的时候，让窗口页面的滚动条返回顶部
  }
})

export default router
