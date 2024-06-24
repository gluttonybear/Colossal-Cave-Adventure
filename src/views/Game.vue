<template>
  <el-container style="height: 98vh;">
    <el-main style="width: 80%; position: relative;">
      <!-- Your game map and control buttons -->
      <div class="map">
        <div class="health">
          <!-- Health bar or other elements can go here -->
        </div>
        <div class="operate">
          <!-- Control buttons -->
          <el-button class="game_button" style="position: absolute;top: 850px; left: 210px;" @click="goNorth">向北</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 200px;" @click="goSouth">向南</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 100px;" @click="goEast">向东</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 300px;" @click="goWest">向西</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 400px;" @click="lookAround">查看</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 500px;" @click="goBack">后退</el-button>
          <el-button class="game_button" style="position: absolute;top: 900px; left: 600px;" @click="openBag">背包</el-button>
        </div>
      </div>

      <!-- Bag dialog -->
      <el-dialog title="背包" :visible.sync="bagDialogVisible" width="55%">
        <el-table :data="paginatedBagItems" style="width: 100%">
          <el-table-column prop="icon" label="图标" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.icon" alt="icon" style="width: 50px; height: 50px;">
            </template>
          </el-table-column>      
          <el-table-column prop="name" label="物品名称" width="120"></el-table-column>    
          <el-table-column label="数量" width="200">
            <template slot-scope="scope">
              <div class="item-quantity">
                <el-slider v-model="scope.row.selectedQuantity" :max="scope.row.quantity" style="width: 70%;"></el-slider>
                <el-input  min="0" :max="scope.row.quantity" v-model.number="scope.row.selectedQuantity" style="width: 100px; text-align: center;margin-left:10px;margin-right:10px;" class="custom-input"></el-input>
                / {{ scope.row.quantity }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="重量（单个）" width="120">
            <template slot-scope="scope">
              {{ scope.row.weight }}
            </template>
          </el-table-column>
          <el-table-column label="重量（总）" width="120">
            <template slot-scope="scope">
              {{ scope.row.weight * scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="item-actions">
                <el-button @click="viewItem(scope.row)">查看</el-button>
                <el-button @click="useItem(scope.row)">使用</el-button>
                <el-button @click="discardItem(scope.row)">丢弃</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5"
          layout="prev, pager, next"
          :total="bagItems.length">
        </el-pagination>
      </el-dialog>
    </el-main>

    <!-- Side panel for logs and settings -->
    <el-aside width="20%" class="log_bg">
      <div class="log_top">
        <el-button type="danger" icon="el-icon-delete" class="log_button" @click="clearLog" circle></el-button>
        <el-button type="info" icon="el-icon-setting" class="settings_button" @click="turnToSettings" circle></el-button>
        <el-dialog title="设置" :visible.sync="settingsDialogVisible" width="30%" :append-to-body="true">
          <el-button @click="logOut">登出</el-button>
        </el-dialog>
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
      logs: [],
      bagItems: [
        { name: 'Sword', icon: 'path/to/sword.png', quantity: 1, weight: 5, selectedQuantity: 1 },
        { name: 'Shield', icon: 'path/to/shield.png', quantity: 1, weight: 10, selectedQuantity: 1 },
        { name: 'Potion', icon: 'path/to/potion.png', quantity: 5, weight: 1, selectedQuantity: 1 },
        { name: 'Helmet', icon: 'path/to/helmet.png', quantity: 1, weight: 3, selectedQuantity: 1 },
        { name: 'Armor', icon: 'path/to/armor.png', quantity: 1, weight: 15, selectedQuantity: 1 },
        { name: 'Boots', icon: 'path/to/boots.png', quantity: 1, weight: 2, selectedQuantity: 1 },
        // Add more items as needed
      ],
      bagDialogVisible: false,
      settingsDialogVisible: false,
      currentPage: 1
    };
  },
  computed: {
    paginatedBagItems() {
      const start = (this.currentPage - 1) * 5;
      const end = start + 5;
      return this.bagItems.slice(start, end);
    }
  },
  methods: {
    addLog(message) {
      this.logs.push(message);
      if (this.logs.length > 100) {
        this.logs.shift(); // Keep log entries within 100
      }
      this.$nextTick(() => {
        const logContainer = this.$el.querySelector('.log-entries');
        logContainer.scrollTop = logContainer.scrollHeight;
      });
    },
    goNorth() {
      this.addLog('向北移动');
    },
    goSouth() {
      this.addLog('向南移动');
    },
    goEast() {
      this.addLog('向东移动');
    },
    goWest() {
      this.addLog('向西移动');
    },
    lookAround() {
      this.addLog('环顾四周');
    },
    goBack() {
      this.addLog('后退一步');
    },
    openBag() {
      this.bagDialogVisible = true;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    clearLog() {
      this.logs = [];
    },
    turnToSettings() {
      this.settingsDialogVisible = true;
    },
    logOut() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    viewItem(item) {
      this.addLog(`查看物品: ${item.name}`);
    },
    useItem(item) {
      this.addLog(`使用物品: ${item.name}`);
    },
    discardItem(item) {
      this.addLog(`丢弃物品: ${item.name}`);
    }
  },
  mounted() {
    this.addLog("游戏开始...");
  }
};
</script>

<style scoped>
.log-container {
  background-color: rgba(255, 255, 255, 0.5);
  max-height: 93%;
  padding: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-right: 20px;
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
  padding: 10px;
  width: 60px;
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
  z-index: 1;
}
.item-quantity {
  display: flex;
  align-items: center;
}
.item-actions {
  display: flex;
  gap: 10px;
}
.custom-input::-webkit-outer-spin-button,
.custom-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.custom-input {
  -moz-appearance: textfield;
}
</style>
