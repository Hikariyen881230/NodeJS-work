const fs = require("fs");

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        fs.readFile("text.txt", "utf-8", (err, data) => {
            if (err) {
                reject('讀取檔案失敗', err);
            } else {
                resolve('成功讀取檔案', data);
            }
        });
    }, 3000);
});
p.then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})