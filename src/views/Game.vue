<template>
  <el-container style="height: 98vh;">
    <el-main style="width: 80%; position: relative;">
      <!-- Your game map and control buttons -->
      <div class="map" :style="backgroundStyle">
        <div class="health">
          <!-- Health bar or other elements can go here -->
        </div>
        <div class="operate">
          <!-- Control buttons -->
          <el-popover placement="top" width="200" trigger="hover" popper-class="direction-popover">
            <div class="direction-buttons">
              <el-row type="flex" class="direction-row">
                <el-col :span="8">
                  <el-button icon="el-icon-arrow-up" class="go_button" @click="go('north')" circle></el-button>
                </el-col>
              </el-row>
              <el-row type="flex" class="direction-row" >
                <el-col :span="8" style="margin-right:10px;">
                  <el-button icon="el-icon-arrow-left" class="go_button" @click="go('west')" circle></el-button>
                </el-col>
                <el-col :span="8">
                  <el-button icon="el-icon-rank" class="go_button" circle></el-button>
                </el-col>
                <el-col :span="8" style="margin-left:10px;">
                  <el-button icon="el-icon-arrow-right" class="go_button" @click="go('east')" circle></el-button>
                </el-col>
              </el-row>
              <el-row type="flex" class="direction-row">
                <el-col :span="8">
                  <el-button icon="el-icon-arrow-down" class="go_button" @click="go('south')" circle></el-button>
                </el-col>
              </el-row>
            </div>
            <el-button slot="reference" class="game_button">前进</el-button>
          </el-popover>
          <el-button class="game_button" @click="lookAround">查看</el-button>
          <el-button class="game_button" @click="goBack">后退</el-button>
          <el-button class="game_button" @click="openBag">背包</el-button>
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
                <el-input min="0" :max="scope.row.quantity" v-model.number="scope.row.selectedQuantity" style="width: 100px; text-align: center; margin-left:10px; margin-right:10px;" class="custom-input"></el-input>
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
import request from "@/utils/request"
export default {
  name: 'Game',
  data() {
    return {
	  bgurl: 'http://localhost:8080/game/background/rooms/room1.png',
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
    },
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.bgurl})`
			};
		}
	},
  created(){
	this.requestGame();
  },
  methods: {
    addLog(message) {
        this.logs.push(message);
        if (this.logs.length > 100) {
          this.logs.shift(); // Keep log entries within 100
        }
        setTimeout(() => {
          const logContainer = this.$el.querySelector('.log-entries');
          logContainer.scrollTop = logContainer.scrollHeight;
        }, 0);
      },
	requestGame() {
	  let user = JSON.parse(localStorage.getItem('user'));
	  let url='/'+ user.name + '/init';
	  request.get(url).then(res => {
	    if (res.success === true) {
	    this.changeBg(this.requestIcon(res.data.gameMap.currentRoom.iconID));
	    } else {
	      Message.error("数据异常！");
	    }
	  });
	},
	async requestIcon(iconID){
		let url='/icon/'+ iconID;
		let pic=this.bgurl;
		//console.log("iconID="+ iconID);
		//request.get(url).then(res => {
		//	console.log("res.data="+res.data);
		//	pic = 'http://localhost:8080/game/' + res.data;
		//	//console.log("pic="+pic);
		//});
		let res = await request.get(url);
		pic = 'http://localhost:8080/game/' + res.data;
		console.log("pic="+pic);
		return pic;
	},
	changeBg(url){
		console.log("url="+this.bgurl);
		this.bgurl=url;
		console.log("bg="+this.bgurl);
	},
	async go(direction){
		if(direction==='east'){
			this.addLog('向东移动');
		}else if(direction==='west'){
			this.addLog('向西移动');
		}else if(direction==='north'){
			this.addLog('向北移动');
		}else if(direction==='south'){
			this.addLog('向南移动');
		}
		
		let user = JSON.parse(localStorage.getItem('user'));
		let url='/'+ user.name + '/go'+'?args='+direction;
		let res = await request.get(url);
		console.log(res)
		if (res.success === true) {
					  this.addLog(res.data.message['']);
					  if(res.data.success === true){
						  //console.log("res.data.message.bg="+ res.data.message.bg);
						  let n = await this.requestIcon(res.data.message.bg);
						  console.log("n="+ n);
						  this.changeBg(n);
					  } 
		} else {
		  Message.error("数据异常！");
		}
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
.el-row {
  padding: 10px 0;
  margin-bottom: 10px; /* 调整 el-row 之间的垂直间距 */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
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
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.operate{
	background-color: rgba(255,255,2555,0.5);
	border-radius: 15px;
	padding: 5px 22px 5px 0px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 2);
	display: flex; /* 添加了flex布局 */
	flex-direction: column; /* 垂直排列 */
	width:200px;
	position: absolute;
	top: 700px;
	left:50px;
}
.game_button {
  padding: 10px;
  margin:10px;
  width: 100%;
}
.direction-popover {
  background-color: rgba(255, 255, 255, 0.5); /* Set popover background color here */
}
.direction-row{
	padding-bottom:0px;
	margin-bottom:0px;
}
.direction-buttons {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
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
