import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

const uiuxDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/uiux?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const webDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/web?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const illustrationDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/illustration?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const clipDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/clip?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const productDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/product?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const otherDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/other?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

createApp({
    data() {
        let portfolio_page = 0;
        let web_page = 0;
        return {
            uiuxData: [],
            webData: [],
            illustrationData: [],
            portfolio_page,
            web_page,
            myChart: null
        };
    },
    methods: {
        portfolio_change(page) {
            this.portfolio_page = page;
        },
        createChart() {
            // 获取 canvas 元素
        var canvas = document.getElementById('myChart');

        // 检查是否存在 canvas 元素
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        // 获取上下文
        var ctx = canvas.getContext('2d');
            // 使用 Chart.js 创建图表
            this.myChart = new Chart(ctx, {
                type: 'radar', // 图表类型
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                    datasets: [{
                        label: "", // 标签
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
            });
        },
        web_page_change(page) {
            this.web_page = page;
            // console.log(this.web_page);
        }
    },
    mounted() {
        this.createChart();
        axios.get(uiuxDataUrl)
            .then((response) => {
                // console.log(response.data.values);
                this.uiuxData = response.data.values;

                const resultObjects = this.uiuxData.map((item) => {
                    return {
                        Name: item[0],
                        tag: item[1],
                        Introduction: item[2],
                        img: item[3],
                        Link: item[4],
                        date: item[5]
                    };
                });
                resultObjects.shift();
                console.log(resultObjects);
                this.uiuxData=resultObjects;
            })
            .catch((error) => {
                console.error('Error fetching UI/UX data:', error);
            });
        axios.get(webDataUrl)
            .then((response) => {
                // console.log(response.data.values);
                this.webData = response.data.values;

                const resultObjects = this.webData.map((item) => {
                    return {
                        Name: item[0],
                        tag: item[1],
                        Introduction: item[2],
                        img: item[3],
                        Link: item[4],
                        date: item[5]
                    };
                });
                resultObjects.shift();
                console.log(resultObjects);
                this.webData=resultObjects;
            })
            .catch((error) => {
                console.error('Error fetching web design data:', error);
            });
        axios.get(illustrationDataUrl)
            .then((response) => {
                // console.log(response.data.values);
                this.illustrationData = response.data.values;

                const resultObjects = this.illustrationData.map((item) => {
                    return {
                        img: item[0],
                        tag: item[1]
                    };
                });
                resultObjects.shift();
                console.log(resultObjects);
                this.illustrationData=resultObjects;
            })
            .catch((error) => {
                console.error('Error fetching web design data:', error);
            });
    }
}).mount("#app");
