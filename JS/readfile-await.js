const fs = require("fs");

let p = new Promise((resolve, reject) => {
  fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// IIEF 立即執行函示
// (() => { })(); or (function () { })();
// 同理在函示前面加上 async 直接執行
(async () => {
  try {
    let result = await p;
    console.log(result);
  } catch (e) {
    console.error("發生錯誤", e);
  }
})();
