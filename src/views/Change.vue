<template>
  <div class="background">
	  <el-image
	       :src="require('@/assets/logo.png')"
	  	 style="width: 57%px; height: 57%;z-index: 1;position: absolute;top: -15px; left: 34%;"
	      ></el-image>
	  <div class="copyright">
	    Copyright© 2024 Team Undefined. All rights reserved.
	  </div>
    <div class="change">
      <!-- 标题 -->
      <div class="title">
        <h1>修改密码</h1>
      </div>
      <!-- 主体 -->
      <div class="main">
        <!-- 用户名表单 -->
        <el-form ref="changeForm" :model="changeForm" label-width="120px" :rules="rules">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="changeForm.username" class="input"></el-input>
          </el-form-item>
          <!-- 旧密码表单 -->
          <el-form-item label="旧密码：" prop="oldPassword">
            <el-input v-model="changeForm.oldPassword" type="password" class="input"></el-input>
          </el-form-item>
          <!-- 新密码表单 -->
          <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="changeForm.newPassword" type="password" class="input"></el-input>
          </el-form-item>
          <!-- 确认新密码表单 -->
          <el-form-item label="确认新密码：" prop="confirmPassword">
            <el-input v-model="changeForm.confirmPassword" type="password" class="input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="foot">
        <!-- 左侧修改密码按钮 -->
        <el-button type="primary" @click="changePassword">修改密码</el-button>
        <!-- 右侧返回登录按钮 -->
        <el-button @click="goToLogin">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"
import { Message } from 'element-ui'
export default {
  name: 'Change',
  data () {
    return {
      changeForm: {
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }, { validator: this.validateConfirmPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    validateConfirmPassword (rule, value, callback) {
      if (value !== this.changeForm.newPassword) {
        callback(new Error('两次输入的新密码不一致'))
      } else {
        callback()
      }
    },
    changePassword () {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          request.post("/user/change", this.changeForm).then(res => {
            if (res.code === '0') {
              Message.success('修改成功！')
              this.$router.push('/')
            } else {
              Message.error(res.message);
            }
          })

        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    goToLogin () {
      // 使用路由导航跳转回登录页面
      this.$router.push('/')
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

.change {
  z-index: 2;
  background-color: rgba(255,255,2555,0.5);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 2);
  flex-direction: column; /* 垂直排列 */
  width:500px;
  position: absolute;
  top: 450px;
}
.title {
  text-align: center;
  margin-bottom: -17px;
  margin-top: -8px;
}


.main {
  display: flex;
  align-items: center;
  width: 500px;
  box-sizing: border-box;
}
.input{
  width: 325px;
  margin-right:10px;
  margin-bottom:-20px;
  border-radius: 5px;
  box-sizing: border-box;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;

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
