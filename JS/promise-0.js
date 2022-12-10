let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('done');
        reject('故意失敗一下');
        // 失敗: reject('失敗的理由');
        // console.log('done');
    }, 3000);  
});

//------------------
console.log(p); // Promise 物件 <pending>

// then 是接 resolve
// catch 是接 reject
p.then((data) => {
    console.log('這裡是 then', data, p);
}).catch((error) => {
    console.error('這裡是 error', error, p);
});