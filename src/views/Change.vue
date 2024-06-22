<template>
  <div class="background">
	  <el-image
	   :src="require('@/assets/logo.png')"
	   style="width: 60%px; height: 60%;z-index: 2;position: absolute;top: -10px; left: 33%; "
	  ></el-image>
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
  position: relative;
  background-image: url(~@/assets/bg.png); /* 修改背景图片 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.change {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 660px;
}
.input{
  width: 500px;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: -20px;
  margin-left: -20px;
  margin-right: -20px;
  background-color: #333;
  padding: 10px;
}

.foot button {
margin-left: 20px;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
</style>
