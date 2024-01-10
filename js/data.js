// Google Sheets API 和金鑰
const googleSheetsBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/';
const apiKey = 'AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

// 不同資料表在 Google Sheets 中的 URL
export const uiuxDataUrl = `${googleSheetsBaseUrl}uiux?alt=json&key=${apiKey}`;
export const webDataUrl = `${googleSheetsBaseUrl}web?alt=json&key=${apiKey}`;
export const illustrationDataUrl = `${googleSheetsBaseUrl}illustration?alt=json&key=${apiKey}`;
export const clipDataUrl = `${googleSheetsBaseUrl}clip?alt=json&key=${apiKey}`;
export const productDataUrl = `${googleSheetsBaseUrl}product?alt=json&key=${apiKey}`;
export const otherDataUrl = `${googleSheetsBaseUrl}other?alt=json&key=${apiKey}`;
export const myinfoDataUrl = `${googleSheetsBaseUrl}myinfo?alt=json&key=${apiKey}`;

// 雷達圖配置
export const chartConfig = {
  type: 'radar',
  data: {
    labels: ['問題解決', 'EQ', '團隊合作', '溝通表達', '責任心'],
    datasets: [
      {
        data: [4, 5, 4, 3, 4],
        backgroundColor: ['rgba(205, 39, 39,0.3)'],
        borderColor: ['rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)'],
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: ['rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)', 'rgba(205, 39, 39,1)'],
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

// 粒子動畫設定
var confettiSettings = {
  target: "confetti_holder",
  max: 80, size: 1,
  animate: true,
  props: ["circle"],
  colors: [[120, 120, 120]],
  clock: "2", rotate: false,
  width: "1600", height: "1200",
  start_from_edge: false,
  respawn: true
};
export var confetti = new ConfettiGenerator(confettiSettings);