const axios = require("axios");
const fs = require("fs/promises");
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211

let stockNo;

(async () => {
  try {
    let date = "20221111";
    let stockNo = await fs.readFile("stocks.txt", "utf-8");
    // console.log(stockNo);
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });
    console.log("await", response.data);
  } catch (e) {
    console.error(e);
  }
})();
