let doWorkPromise = function (job, timer) {
    // 1. 物件 -> new
    return new Promise((resolve, reject) => {
        // 2. 執行非同步工作
        setTimeout(() => {
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);
        }, timer);
    });
};

// promise-chain : 
// resolve後 再呼叫一次doWorkPromise 並return回data 

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
let brushPromise = doWorkPromise('刷牙', 3000);
brushPromise
    .then((data) => {
        console.log(data);
        let doAnotherWork1 = doWorkPromise('吃飯', 5000);
        return doAnotherWork1;
    })
    .then((data) => {
        console.log(data)
        let doAnotherWork2 = doWorkPromise('打遊戲', 2000)
        return doAnotherWork2;
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.error('發生錯誤', err);
    })
    .finally(() => {
        console.log("這裡最後一定會跑!")
    })