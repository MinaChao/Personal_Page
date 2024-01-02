import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const googleSheetsBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/';
const apiKey = 'AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

const uiuxDataUrl = `${googleSheetsBaseUrl}uiux?alt=json&key=${apiKey}`;
const webDataUrl = `${googleSheetsBaseUrl}web?alt=json&key=${apiKey}`;
const illustrationDataUrl = `${googleSheetsBaseUrl}illustration?alt=json&key=${apiKey}`;
const clipDataUrl = `${googleSheetsBaseUrl}clip?alt=json&key=${apiKey}`;
const productDataUrl = `${googleSheetsBaseUrl}product?alt=json&key=${apiKey}`;
const otherDataUrl = `${googleSheetsBaseUrl}other?alt=json&key=${apiKey}`;
const myinfoDataUrl = `${googleSheetsBaseUrl}myinfo?alt=json&key=${apiKey}`;

const chartConfig = {
  type: 'radar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: "",
      data: [8, 10, 4, 6, 2],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

createApp({
  data() {
    return {
      uiuxData: [],
      webData: [],
      illustrationData: [],
      clipData: [],
      productData: [],
      otherData: [],
      myinfoData: [],
      portfolio_page: 0,
      web_page: 0,
      myChart: null,
    };
  },
  methods: {
    portfolio_change(page) {
      this.portfolio_page = page;
    },
    createChart() {
      var canvas = document.getElementById('myChart');
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      var ctx = canvas.getContext('2d');
      this.myChart = new Chart(ctx, chartConfig);
    },
    web_page_change(page) {
      this.web_page = page;
    },
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
        console.error(`Error fetching data from ${url}:`, error);
        return [];
      }
    },
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
    this.createChart();
    await this.loadData();
        axios.get(myinfoDataUrl)
            .then((response) => {
                // console.log(response.data.values);
                this.myinfoData = response.data.values;

                const resultObjects = this.myinfoData.map((item) => {
                    return {
                        skill: item[0],
                        software: item[1],
                        Introduction: item[2],
                        img: item[3]
                    };
                });
                resultObjects.shift();
                console.log(resultObjects);
                this.myinfoData=resultObjects;
            })
            .catch((error) => {
                console.error('Error fetching myinfo data:', error);
            });
  }
}).mount("#app");