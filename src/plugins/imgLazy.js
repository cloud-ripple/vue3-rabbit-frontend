// 封装图片懒加载指令 -> 插件

// 引入VueUse插件相关函数,来实现懒加载
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  //当使用 app.use() 插件的时候,vue会自动调用该插件对象中的一个名为 install()的方法
  // 并且会给该方法第一个参数传入 app实例(相当于Vue实例)，后面的的是其它传入的参数
  install(app, ...other) {
    // console.log('插件接收到的参数有：', app, ...other)
    // 定义全局自定义指令
    app.directive('img-lazy', {
      // 懒加载指令逻辑
      //el 指令绑定的元素DOM，binding.value 指令表达式的值(=号后面的值，即图片url)
      mounted(el, binding) {
        // console.log(el, binding.value)
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting) //当图片进入视口区域时为 true
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value //把图片url赋值
            // useIntersectionObserver对于元素的监听是一直存在的，除非手动停止监听，存在内存浪费
            stop() // 图片第一次加载完毕之后，停止监听
          }
        })
      }
    })
  }
}
