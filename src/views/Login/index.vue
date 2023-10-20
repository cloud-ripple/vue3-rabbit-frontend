<script setup>
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
//Pinia 管理用户数据
import { useUserStore } from '@/stores/user'
// 得到一个Store实例对象，然后可以使用该实例身上的 state数据 和 action函数
const userStore = useUserStore()

// 表单校验
// 1. 按照接口字段准备表单对象，并进行绑定
const form = ref({
  account: '',
  password: '',
  agree: true // 是否同意协议
})

// 2. 准备规则对象
const rules = {
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    // 针对 props 指定的校验属性，可以有多个校验规则对象
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6~14位', trigger: 'blur' }
  ],
  /**
   自定义校验规则 validator
   ElementPlus表单组件内置了初始的校验配置，应付简单的校验只需要通过配置即可，也可以自定义特殊的校验需求
   校验逻辑：如果勾选了同意协议框，通过校验，反之没有勾选，不通过校验

   val: 当前输入的数据，因为此处校验的是 agree属性，所以此处的 val值接收到的是 同意协议单选框checkbox的值
   callback: 校验处理函数，校验通过时调用
   */
  agree: [
    {
      validator: (rule, val, callback) => {
        // console.log(value === true ? '已勾选同意' : '未勾选')
        // 勾选了同意协议框，通过校验，反之没有
        if (val) {
          callback()
        } else {
          callback(new Error('请先勾选协议'))
        }
      }
    }
  ]
}

// 3. 获取form表单实例做统一校验
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  // 调用 el-button 实例身上提供的 validate方法
  formRef.value.validate(async (valid) => {
    // valid: 当 el-form-所有表单项都通过校验时，valid 才为true
    // 如果通过校验才执行登录逻辑
    const { account, password } = form.value
    if (valid) {
      // 调用登录接口
      // const res = await loginAPI({
      //   account,
      //   password
      // })
      userStore.getUserInfo({ account, password })
      // console.log('登录结果', res)
      // 1.提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      // 2.跳转首页
      router.replace({
        path: '/'
      })
    }
  })
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!-- 此处使用的是ElementPlus提供的表单校验功能，增加 rules 校验规则属性
            注意此处的 model 属性可以进行表单数据的双向绑定，它是Element指定，不能使用 v-model -->
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <!-- 3. 通过 prop 属性指定表单域的校验字段名，与 rules配合使用 -->
              <el-form-item label="账户" prop="account">
                <!-- 4. v-model把表单对象进行双向绑定 -->
                <el-input v-model="form.account" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" />
              </el-form-item>
              <!-- 同意协议 -->
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox v-model="form.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
