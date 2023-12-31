import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

const uiuxDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/uiux?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const webDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/web?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const illustrationDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/illustration?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const clipDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/clip?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';
const productDataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TUZOFns9dqeBfhOfxWJ3_9H4ACBtAycmm47yHpwF-Ek/values/product?alt=json&key=AIzaSyA1M5R1HsJnEvDl5C6HY4fYY8s7dsBG2zw';

createApp({
    data() {
        return {
            uiuxData: [],
            webData: []
        };
    },
    mounted() {
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
            })
            .catch((error) => {
                console.error('Error fetching web design data:', error);
            });
    }
}).mount("#app");