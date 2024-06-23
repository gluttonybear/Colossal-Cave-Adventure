<template>
  <el-container style="height: 98vh;">
    <el-main style="width: 80%; position: relative;">
      <div class="map">
        <div class="health">
          <!-- Health bar or other elements can go here -->
        </div>
        <div class="operate">
          <el-button class="game_button">North</el-button>
          <el-button class="game_button">South</el-button>
          <el-button class="game_button">East</el-button>
          <el-button class="game_button">West</el-button>
        </div>
      </div>
    </el-main>
    <el-aside width="20%" class="log_bg">
      <div></div>
      <div class="log_top">
        <el-button type="danger" icon="el-icon-delete" class="log_button" circle></el-button>
        <el-button type="info" icon="el-icon-setting" class="settings_button" circle></el-button>
      </div>
      <div class="log-container">
        <el-scrollbar wrap-style="overflow-x:hidden;">
          <div class="log-entries">
            <p v-for="(log, index) in logs" :key="index" :class="{ 'centered-log': log === 'Game started...' }">{{ log }}</p>
          </div>
        </el-scrollbar>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      logs: []
    };
  },
  mounted() {
    this.addLog("Game started...");
    // 模拟实时日志
    setInterval(() => {
      this.addLog(`Log entry at ${new Date().toLocaleTimeString()}`);
    }, 2000);
  },
  methods: {
    addLog(message) {
      this.logs.push(message);
      if (this.logs.length > 100) {
        this.logs.shift(); // 保持日志条目不超过100条
      }
      this.$nextTick(() => {
        const logContainer = this.$el.querySelector('.log-entries');
        logContainer.scrollTop = logContainer.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.log-container {
  background-color: rgba(255,255,2555,0.5);
  max-height: 93%;
  padding: 20px;
  margin-top:-10px;
  margin-bottom:10px;
  box-sizing: border-box;
  margin-left:20px;
  margin-right:20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
}
.log-entries {
  background-color: transparent; /* Use transparent to show the background image */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  box-sizing: border-box;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.log-entries p {
  background-color: #2d999e;
  margin: 0;
  padding: 10px;
  margin-bottom: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: left;
  border-radius: 8px;
}
.centered-log {
  text-align: center;
}
.map {
  background: url('~@/assets/bg.png');
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.game_button {
  /* Add styles for game buttons if needed */
}
.log_top {
  padding: 10px;
  height: 5%;
  background-color: transparent; /* Use transparent to show the background image */
}
.log_button {
  margin-left: 210px;
}
.settings_button {
  margin-left: 10px;
   margin-right: -30px;
}
.log_bg {
  background: url('~@/assets/bg.png'); /* Specify your aside background image here */
  background-size: cover; /* Adjust as needed */
  position: relative;
  height: 100%;
  z-index: 1
}
</style>
