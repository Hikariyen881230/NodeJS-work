const fs = require("fs");
fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("發生錯誤", err)
    } else {
        console.log("成功讀取檔案", data)
    }
});
