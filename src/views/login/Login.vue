<template>
  <div class="main">
    <!--   :autoFormCreate="(form)=>{this.form = form}"    ref="formLogin"-->
    <a-form class="login-layout-login" :form="form" id="formLogin" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
          placeholder="请输入用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
          type="Password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model="formLogin.rememberMe">自动登陆</a-checkbox>
        <!-- <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>-->

        <router-link :to="{}" class="forge-password">忘记密码</router-link>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
        >登陆</a-button>
        <!--  @click.stop.prevent="handleSubmit" -->
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { loginByUserName } from '@/api/login'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data () {
    return {
      loginBtn: false,
      formLogin: {
        username: "",
        password: "",
        // captcha: "",
        // mobile: "",
        rememberMe: true
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()//阻止其它事情运行
      this.loginBtn = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          loginByUserName(values)
            .then(resp => {
              console.log("chen", resp)
              this.loginSuccess()
            })
            .catch(err => {
              this.loginFailed(err)
            })
        }
      })
    },
    loginSuccess () {
      this.loginBtn = false
      console.log("---------loginSuccess-------")
      this.$router.push({ name: 'home' })
      this.$notification.success({
        message: '登陆成功',
        description: '欢迎回来',
      })
    },
    loginFailed (err) {
      this.loginBtn = false
      console.log(err)
    }
  }

}
</script>

<style lang="scss" scoped>
.login-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
    float: right;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

