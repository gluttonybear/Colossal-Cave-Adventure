<template>
  <el-container style="height: 98vh;">
    <el-main style="width: 80%; position: relative;">
      <div class="map">
		  <div class="health">
			  
		  </div>
		  <div class="operate">
		  		<el-button style="button" >	north</el-button>
				<el-button style="button" >	south</el-button>
				<el-button style="button" >	east</el-button>
				<el-button style="button" >	west</el-button>
		  </div>
	  </div>
    </el-main>
    <el-aside width="20%">
      <div class="log-container">
        <el-scrollbar  wrap-style="overflow-x:hidden;">
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
  },0
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
  padding: 20px;
  box-sizing: border-box;
  background-color: #2c3b6f;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.log-entries {
  background-color: #2c3b6f;
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
  padding: 10px ;
  margin-bottom:5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: left;
  border-radius: 8px;
  
}

.centered-log {
  text-align: center;
}

.map {
  background: 
    url('~@/assets/bg.png');
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
