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

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);

// async 只能在 promise-base 裡面作用 =>為了解決promise hell

async function doWork() {
  try {
    // 遇到await會直接暫停 async 後面宣告的函示 直到其他程式跑完
    // 每一段await就相當於 .then() 當遇到一段await會暫停整個函示
    // 當出現resolve或reject後 才會執行下一個await
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log(result1);

    let result2 = await doWorkPromise("吃飯", 3000);
    console.log(result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
}
async function doWork() {
  try {
    // 遇到await會直接暫停 async 後面宣告的函示 直到其他程式跑完
    // 每一段await就相當於 .then() 當遇到一段await會暫停整個函示
    // 當出現resolve或reject後 才會執行下一個await
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log(result1);

    let result2 = await doWorkPromise("吃飯", 3000);
    console.log(result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
}
async function doWork() {
  try {
    // 遇到await會直接暫停 async 後面宣告的函示 直到其他程式跑完
    // 每一段await就相當於 .then() 當遇到一段await會暫停整個函示
    // 當出現resolve或reject後 才會執行下一個await
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log(result1);

    let result2 = await doWorkPromise("吃飯", 3000);
    console.log(result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
}
async function doWork() {
  try {
    // 遇到await會直接暫停 async 後面宣告的函示 直到其他程式跑完
    // 每一段await就相當於 .then() 當遇到一段await會暫停整個函示
    // 當出現resolve或reject後 才會執行下一個await
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log(result1);

    let result2 = await doWorkPromise("吃飯", 3000);
    console.log(result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
}
async function doWork() {
  try {
    // 遇到await會直接暫停 async 後面宣告的函示 直到其他程式跑完
    // 每一段await就相當於 .then() 當遇到一段await會暫停整個函示
    // 當出現resolve或reject後 才會執行下一個await
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log(result1);

    let result2 = await doWorkPromise("吃飯", 3000);
    console.log(result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
}
doWork();
console.log("-dash-");
