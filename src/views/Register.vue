<template>
  <div class="background">
	<el-image
	     :src="require('@/assets/logo.png')"
		 style="width: 57%px; height: 57%;z-index: 1;position: absolute;top: -15px; left: 34%;"
	></el-image>
	<div class="copyright">
	  Copyright© 2024 Team Undefined. All rights reserved.
	</div>
    <div class="register">
      <!-- 标题 -->
      <div class="title">
        <h1>注册新用户</h1>
      </div>
      <!-- 主体 -->
      <div class="main">
        <!-- 左侧注册信息表单 -->
        <el-form ref="registerForm" :model="registerForm" label-width="0px" class="form-container">
          <div class="left">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" class="input"></el-input>
			<el-input type="password" v-model="registerForm.password" placeholder="请输入密码" class="input"></el-input>
            <el-input type="email" v-model="registerForm.email" placeholder="请确认密码" class="input"></el-input>               
          </div>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="foot">
        <!-- 左侧注册用户按钮 -->
        <el-button class="registerButton" type="primary" @click="register">注册用户</el-button>
        <!-- 右侧返回登录按钮 -->
        <el-button class="changePasswordButton" type="text" @click="goToLogin">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DatePicker, Input, Button, Upload, Icon, Message } from 'element-ui'
import request from "@/utils/request"

export default {
  name: 'Register',
  components: {
    ElDatePicker: DatePicker,
    ElInput: Input,
    ElButton: Button,
    ElUpload: Upload,
    ElIcon: Icon
  },
  data () {
    return {
      registerForm: {
      username: '',
      email: '',
      password: '',
      birthday: ''
      },
      imageUrl: '' // Assuming you have a data property for the uploaded image URL
    }
  },
  methods: {
    register () {
      // 验证用户名、邮箱、密码和出生日期是否为空
      if (!this.registerForm.username || !this.registerForm.email || !this.registerForm.password || !this.registerForm.birthday) {
        Message.error('用户名、邮箱、密码和出生日期均不能为空')
        return
      }

      // 验证邮箱格式
      const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!emailPattern.test(this.registerForm.email)) {
        Message.error('请输入有效的邮箱地址')
        return
      }
      request.post("/user/register", this.registerForm).then(res => {
        if (res.code === '0') {
          Message.success('注册成功')
          this.goToLogin()
        } else {
          Message.error(res.message);
        }
      })
    },
    // 返回登录按钮点击事件处理函数
    goToLogin () {
      // 使用路由导航跳转回登录页面
      this.$router.push('/')
    },
    successUpload (res) {
      this.imageUrl = 'http://localhost:8081/files/' + res.data
      this.registerForm.image = res.data
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
.title {
  text-align: center;
  margin-bottom: -30px;
  margin-top: -8px;
}
.register {
  z-index: 2;
   background-color: rgba(255,255,2555,0.5);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 2);
  display: flex;
  flex-direction: column;
  width: 500px; 
  position: absolute;
  top: 450px;
}
.main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.form-container {
  display: flex;
  width: 100%;
}

.left {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
}

.input {
  width: 100%; /* 输入框占满容器宽度 */
  margin-bottom: 20px; /* 调整间距 */
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9; /* 虚线边框 */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
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
  height:100%;
  margin-left: 70px;
  margin-right: 70px;
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
