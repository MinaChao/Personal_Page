// 從 CDN 引入 Vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// Google Sheets API 和金鑰
const googleSheetsBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/';
const apiKey = 'AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

// 不同資料表在 Google Sheets 中的 URL
const uiuxDataUrl = `${googleSheetsBaseUrl}uiux?alt=json&key=${apiKey}`;
const webDataUrl = `${googleSheetsBaseUrl}web?alt=json&key=${apiKey}`;
const illustrationDataUrl = `${googleSheetsBaseUrl}illustration?alt=json&key=${apiKey}`;
const clipDataUrl = `${googleSheetsBaseUrl}clip?alt=json&key=${apiKey}`;
const productDataUrl = `${googleSheetsBaseUrl}product?alt=json&key=${apiKey}`;
const otherDataUrl = `${googleSheetsBaseUrl}other?alt=json&key=${apiKey}`;
const myinfoDataUrl = `${googleSheetsBaseUrl}myinfo?alt=json&key=${apiKey}`;

// 粒子動畫設定
var confettiSettings = {
  target: "confetti_holder",
  max: 80, size: 1,
  animate: true,
  props: ["circle"],
  colors: [[120, 120, 120]],
  clock: "2", rotate: false,
  width: "1498", height: "705",
  start_from_edge: false,
  respawn: true
};
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

// 雷達圖配置
const chartConfig = {
  type: 'radar',
  data: {
    labels: ['問題解決', 'EQ', '團隊合作', '溝通表達', '責任心'],
    datasets: [
      {
        data: [4, 5, 4, 3, 4],
        backgroundColor: ['rgba(205, 39, 39,0.3)'],
        borderColor: ['rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)','rgba(205, 39, 39,1)','rgba(205, 39, 39,1)','rgba(205, 39, 39,1)'],
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: ['rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)','rgba(205, 39, 39,1)','rgba(205, 39, 39,1)','rgba(205, 39, 39,1)'],
      },
      {
        data: [0, 1, 2, 3, 4, 5],
        backgroundColor: ['rgba(255, 255, 255, 0)'],
        borderColor: Array(6).fill('rgba(255, 255, 255, 0)'),
        pointBackgroundColor: Array(6).fill('rgba(255, 255, 255, 0)'),
        borderWidth: 0,
      },
    ],
  },
  options: {
    spanGaps: true,
    responsive: true,
    tooltips: {
      enabled: false  // 關閉 tooltips（hover 功能）
    },
    legend: {
      display: false
    },
    scale: {
      pointLabels: {
        fontSize: 11, // 設定標籤字體大小
        fontColor: '#f3f3f3',
        backgroundColor: 'rgba(205, 39, 39,0.3)', // 設定標籤背景顏色
      },
      gridLines: {
        color: 'rgba(196, 196, 196,0.2)'
      },
      ticks: {
        color: 'rgba(196, 196, 196,0.2)',
        backdropColor: 'rgba(196, 196, 196,0)'
      }
    }
  }
};

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
    };
  },
  methods: {
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
    }
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
