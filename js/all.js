// 從 CDN 引入 Vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { uiuxDataUrl,webDataUrl,illustrationDataUrl,clipDataUrl,productDataUrl,otherDataUrl,myinfoDataUrl,chartConfig,confetti } from "./data.js";

confetti.render();

class Player {
  constructor() {
      this.hp = 100;
      this.maxHp = 100;
      this.mp = 50;
      this.maxMp = 100;
      this.atk = Math.floor(Math.random() * (25 - 5 + 1) + 15);
      this.sp = 0;
      this.maxSp = 3;
  }

  normalAttack(monsterDef) {
      this.sp = Math.min(this.maxSp, this.sp + 1);
      const damage = Math.max(0, this.atk - monsterDef);
      return damage;
  }

  magicAttack(monsterDef) {
      if (this.mp >= 10) {
          this.mp -= 10;
          const damage = Math.max(0, Math.floor(this.atk * 1.5) - monsterDef);
          return damage;
      } else {
          return 0;
      }
  }

  heal() {
      if (this.mp >= 10) {
          this.mp -= 10;
          const healAmount = Math.floor(Math.random() * (40 - 10 + 1) + 20);
          this.hp = Math.min(this.maxHp, this.hp + healAmount);
      }
  }

  restoreMP() {
      if (this.sp > 0) {
          this.sp -= 1;
          const restoreAmount = Math.floor(Math.random() * (30 - 10 + 1) + 10);
          this.mp = Math.min(this.maxMp, this.mp + restoreAmount);
      }
  }
}

class Monster {
  constructor(name, def, atkRange, crit, imagePath) {
      this.name = name;
      this.hp = 100;
      this.maxHp = 100;
      this.sp = 0;
      this.maxSp = 50;
      this.def = def;
      this.atk = Math.floor(Math.random() * (atkRange[1] - atkRange[0] + 1) + atkRange[0]);
      this.crit = crit;
      this.imagePath = imagePath;
  }

  attack() {
      let damage = Math.max(0, this.atk);
      if (this.sp === this.maxSp) {
          damage = Math.floor(this.atk * this.crit);
          this.sp = 0;
      }
      return damage;
  }
}


// 創建 Vue app
createApp({
  data() {
    return {
      // 定義不同資料表的資料
      uiuxData: [],
      webData: [],
      illustrationData: [],
      clipData: [],
      productData: [],
      otherData: [],
      myinfoData: [],
      // 目前顯示的頁面
      portfolio_page: 0,
      web_page: 0,
      // Chart.js 實例
      myChart: null,
      loading: false,
      player: new Player(),
      monsters: [
          new Monster("怪物1", 0, [3, 5], 1.2," "),
          new Monster("怪物2", 0, [5, 8], 1.5," "),
          new Monster("怪物3", 0, [10, 12], 2," "),
      ],
      currentMonsterIndex: 0,
    };
  },
  methods: {
    // 玩家普通攻擊方法
    attack() {
      const monster = this.monsters[this.currentMonsterIndex];
      const damage = this.player.normalAttack(monster.def);
      monster.hp = Math.max(0, monster.hp - damage);
      monster.sp = Math.min(monster.maxSp, monster.sp + 20);
      this.monsterAttack();
      console.log("playHP:"+this.player.hp);
      console.log("monsterHP:" + this.monsters[this.currentMonsterIndex].hp);
  },
  // 玩家魔法攻擊方法
  magicAttack() {
      const monster = this.monsters[this.currentMonsterIndex];
      const damage = this.player.magicAttack(monster.def);
      monster.hp = Math.max(0, monster.hp - damage);
      monster.sp = Math.min(monster.maxSp, monster.sp + 20);
      this.monsterAttack();
  },
  // 玩家治療方法
  heal() {
      this.player.heal();
      this.monsterAttack();
  },
  // 回復魔力方法
  restoreMP() {
      this.player.restoreMP();
      this.monsterAttack();
  },
  // 怪物攻擊方法
  monsterAttack() {
      const monster = this.monsters[this.currentMonsterIndex];
      const monsterDamage = monster.attack();
      this.player.hp = Math.max(0, this.player.hp - monsterDamage);
      console.log("monsterDamage:"+monsterDamage);
      // 假設等待1秒再檢查遊戲狀態
      setTimeout(() => {
          this.checkGameStatus();
      }, 1000);
  },
  checkGameStatus() {
      if (this.player.hp <= 0) {
          alert("你的HP歸零了，遊戲重新開始！");
          this.restartGame();
      } else if (this.monsters[this.currentMonsterIndex].hp <= 0) {
          this.currentMonsterIndex++;
          if (this.currentMonsterIndex >= this.monsters.length) {
              alert("恭喜你，成功擊敗所有怪物！");
              this.restartGame();
          }
      }
  },
  restartGame() {
      this.player = new Player();
      this.currentMonsterIndex = 0;
      for (let monster of this.monsters) {
          monster.hp = monster.maxHp;
          monster.sp = 0;
      }
  },
    // 切換專案類別
    async portfolio_change(page) {
      this.portfolio_page = page;
      this.loading = true;
      await this.loadData();
      this.loading = false;
      AOS.refreshHard({ delay: 1000, }); // 重新初始化 AOS
    },
    // 創建 Chart.js 圖表
    createChart() {
      var canvas = document.getElementById('myChart');
      if (!canvas) {
        console.error('找不到 Canvas 元素');
        return;
      }
      var ctx = canvas.getContext('2d');
      this.myChart = new Chart(ctx, chartConfig);
    },
    // 切換網頁頁面
    async web_page_change(page) {
      AOS.init();
      this.loading = true;
      this.web_page = page;
      await this.loadAllData();
      this.loading = false;
      AOS.refreshHard(); // 重新初始化 AOS
    },
    // 從 Google Sheets 中抓取資料
    async fetchData(url) {
      try {
        const response = await axios.get(url);
        const data = response.data.values;
        const resultObjects = data.map((item) => ({
          Name: item[0],
          tag: item[1],
          Introduction: item[2],
          img: item[3],
          Link: item[4],
          date: item[5]
        }));
        resultObjects.shift();
        return resultObjects;
      } catch (error) {
        console.error(`從 ${url} 抓取資料時發生錯誤:`, error);
        return [];
      }
    },
    // 載入所有資料
    async loadData() {
      if (this.portfolio_page === 0 && this.web_page === 2) {
        this.uiuxData = await this.fetchData(uiuxDataUrl);
      } else if (this.portfolio_page === 1 && this.web_page === 2) {
        this.webData = await this.fetchData(webDataUrl);
      } else if (this.portfolio_page === 2 && this.web_page === 2) {
        this.illustrationData = await this.fetchData(illustrationDataUrl);
      } else if (this.portfolio_page === 3 && this.web_page === 2) {
        this.clipData = await this.fetchData(clipDataUrl);
      } else if (this.portfolio_page === 4 && this.web_page === 2) {
        this.productData = await this.fetchData(productDataUrl);
      } else if (this.portfolio_page === 5 && this.web_page === 2) {
        this.otherData = await this.fetchData(otherDataUrl);
      }
    },
    async loadAllData() {
      if (this.web_page === 2) {
        this.uiuxData = await this.fetchData(uiuxDataUrl);
        this.webData = await this.fetchData(webDataUrl);
        this.illustrationData = await this.fetchData(illustrationDataUrl);
        this.clipData = await this.fetchData(clipDataUrl);
        this.productData = await this.fetchData(productDataUrl);
        this.otherData = await this.fetchData(otherDataUrl);
      }
    },
    increaseHP() {
      // 增加 HP 寬度（這裡以增加 10% 為例）
      if (this.player.mp >= 10) {
        this.player.hp += 10;
        this.player.mp -= 10;
      }
      // 確保 HP 寬度不超過 100%
      if (this.player.hp > 100) {
        this.player.hp = 100;
      }
      if (this.player.mp < 0) {
        this.player.mp = 0;
      }
    },
    increaseMP() {
      if (this.player.sp >= 1) {
        this.player.mp += 10;
        this.player.sp -= 1;
      }
      // 確保 MP 寬度不超過 100%
      if (this.player.mp > 100) {
        this.player.mp = 100;
      }
      if (this.player.sp < 0) {
        this.player.sp = 0;
      }
    },
  },
  async mounted() {
    this.loading = true;
    AOS.init();
    // 創建 Chart.js 圖表並載入資料
    this.createChart();
    await this.loadData();
    axios.get(myinfoDataUrl)
      .then((response) => {
        this.myinfoData = response.data.values;
        const resultObjects = this.myinfoData.map((item) => ({
          skill: item[0],
          software: item[1],
        }));
        resultObjects.shift();
        // console.log(resultObjects);
        this.myinfoData = resultObjects;
      })
      .catch((error) => {
        console.error('抓取我的資訊時發生錯誤:', error);
      });
    this.loading = false;
    AOS.refreshHard();
  }
}).mount("#app");
