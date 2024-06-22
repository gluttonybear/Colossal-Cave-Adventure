<template>
  <div class="background">
	    <el-image
	     :src="require('@/assets/logo.png')"
		 style="width: 57%px; height: 57%;z-index: 1;position: absolute;top: -15px; left: 34%;"
	    ></el-image>
	<div class="copyright">
	  Copyright© 2024 Team Undefined. All rights reserved.
	</div>
    <div class="login">
      <!-- 标题 -->
      <div class="title">
        <h1>欢迎登录</h1>
      </div>
      <!-- 主体 -->
      <div class="main">
        <div class="normalLogin">
          <el-form ref="loginForm" :model="loginForm" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 底部 -->
      <div class="foot">
        <!-- 注册用户按钮 -->
        <button class="registerButton" @click="goToRegister">注册用户</button>
        <!-- 修改密码按钮 -->
        <button class="changePasswordButton" @click="goToChangePassword">修改密码</button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"
import { Message } from 'element-ui'
export default {
  name: 'LogIn',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
if (this.$route.path !== '/game') {
        this.$router.push('/game')
		}
          // request.post("/user/login", this.loginForm).then(res => {
          //   if (res.code === '0') {
          //     Message.success("登陆成功!");
          //     localStorage.setItem("user",JSON.stringify(res.data))
          //     this.$router.push("/");
          //   } else {
          //     Message.error(res.message);
          //   }
          // })
        },
    goToRegister () {
      if (this.$route.path !== '/register') {
        this.$router.push('/register')
      }
    },
    goToChangePassword () {
      if (this.$route.path !== '/change') {
        this.$router.push('/change')
      }
    }
  }
}
</script>

<style scoped>
.background {
 background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.8) 95%, rgba(0, 0, 0, 1) 100%),
    url('~@/assets/bg.png');
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera, and Firefox */
  
  
}
.login {
  z-index: 2;
  background-color: rgba(255,255,2555,0.5);
  border-radius: 15px;
  padding: 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 2);
  display: flex; /* 添加了flex布局 */
  flex-direction: column; /* 垂直排列 */
  width:500px;
  position: absolute;
  top: 450px;
}

.title {
  text-align: center;
  margin-bottom: -30px;
  margin-top: -8px;
}

.main {
  padding: 20px;
  display: flex; /* 添加了flex布局 */
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 垂直居中对齐 */
  flex: 1; /* 填充剩余空间 */
}

.normalLogin {
  flex:2;
}
.normalLogin input {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom:-px;
}

.normalLogin button {
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #e46667;
  color: #fff;
  cursor: pointer;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  margin-bottom: -20px;
  background-color: #333;
  padding: 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.foot button {
  height:120%;
  margin-left: 70px;
  margin-right: 70px;
  margin-top:5px;
  margin-bottom:5px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
.copyright{
   width: 100%;
    padding: 10px 0;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7); /* 半透明背景 */
    color: #fff; /* 文字颜色 */
    z-index: 2; /* 确保在其他内容之上 */
}

</style>
