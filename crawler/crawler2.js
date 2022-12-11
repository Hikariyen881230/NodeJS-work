const axios = require("axios");
(async () => {
  try {
    let stockNo = "2618";
    let date = "202211";
    let response = await axios.get("http://54.71.133.152:3000/stocks", {
      params: {
        stockNo,
        date,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
})();
