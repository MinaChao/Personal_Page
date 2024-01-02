import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const googleSheetsBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/';
const apiKey = 'AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

// 定義各個資料表的 URL
const uiuxDataUrl = `${googleSheetsBaseUrl}uiux?alt=json&key=${apiKey}`;
const webDataUrl = `${googleSheetsBaseUrl}web?alt=json&key=${apiKey}`;
const illustrationDataUrl = `${googleSheetsBaseUrl}illustration?alt=json&key=${apiKey}`;
const clipDataUrl = `${googleSheetsBaseUrl}clip?alt=json&key=${apiKey}`;
const productDataUrl = `${googleSheetsBaseUrl}other?alt=json&key=${apiKey}`;
const otherDataUrl = `${googleSheetsBaseUrl}other?alt=json&key=${apiKey}`;
const myinfoDataUrl = `${googleSheetsBaseUrl}myinfo?alt=json&key=${apiKey}`;
tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#fff"
    }
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  interactivity: {
    detectsOn: "window"
  },
  emitters: {
    position: {
      x: 50,
      y: -50
    },
    rate: {
      quantity: 5,
      delay: 0.25
    }
  },
  particles: {
    color: {
      value: ["949494"]
    },
    move: {
      decay: 0.4,
      direction: "top",
      enable: true,
      gravity: {
        enable: true
      },
      outModes: {
        top: "none",
        default: "destroy"
      },
      speed: { min: 80, max: 120 }
    },
    number: {
      value: 0
    },
    opacity: {
      value: 0.1
    },
    rotate: {
      value: {
        min: 0,
        max: 0
      },
      direction: "random",
      animation: {
        enable: true,
        speed: 5
      }
    },
    tilt: {
      direction: "random",
      enable: true,
      value: {
        min: 0,
        max: 360
      },
      animation: {
        enable: true,
        speed: 3
      }
    },
    size: {
      value: 6
    },
    roll: {
      darken: {
        enable: true,
        value: 25
      },
      enable: true,
      speed: {
        min: 5,
        max: 15
      }
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -7,
        max: 7
      }
    },
    shape: {
      type: [
        "circle",
      ]
    }
  }
});

// 定義雷達圖的配置
const chartConfig = {
  type: 'radar',
  data: {
    labels: ['問題解決', 'EQ', '團隊合作', '溝通表達', '責任心'],
    datasets: [
      {
        data: [4, 5, 4, 3, 4],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
      },
      {
        data: [5, 5, 5, 0, 5, 0],
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
        fontSize: 12 // 在這裡設定標籤的字體大小
      }
    }
  }
};

createApp({
  data() {
    return {
      // 定義各個資料表的資料
      uiuxData: [],
      webData: [],
      illustrationData: [],
      clipData: [],
      productData: [],
      otherData: [],
      myinfoData: [],
      // 當前顯示的頁面
      portfolio_page: 0,
      web_page: 1,
      // Chart.js 實例
      myChart: null,
      // 是否顯示圖表
      showChart: false
    };
  },
  methods: {
    // 切換專案類別
    portfolio_change(page) {
      this.portfolio_page = page;
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
    web_page_change(page) {
      this.web_page = page;
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
      this.uiuxData = await this.fetchData(uiuxDataUrl);
      this.webData = await this.fetchData(webDataUrl);
      this.illustrationData = await this.fetchData(illustrationDataUrl);
      this.clipData = await this.fetchData(clipDataUrl);
      this.productData = await this.fetchData(productDataUrl);
      this.otherData = await this.fetchData(otherDataUrl);
    },
  },
  async mounted() {
    
    // 在元件掛載後創建 Chart.js 圖表並載入資料
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
        console.log(resultObjects);
        this.myinfoData = resultObjects;
      })
      .catch((error) => {
        console.error('抓取我的資訊時發生錯誤:', error);
      });
  }
}).mount("#app");