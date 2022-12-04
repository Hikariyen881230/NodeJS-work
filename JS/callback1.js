let doWork = function (job, job2, job3, timer, cb) {

    setTimeout(() => {
        let now = new Date();
        cb(null, `完成工作 ${job} at ${now.toISOString()}`);

        setTimeout(() => {
            let now = new Date();
            cb(null, `完成工作 ${job3} at ${now.toISOString()}`);

            setTimeout(() => {
                let now = new Date();
                cb(null, `完成工作 ${job3} at ${now.toISOString()}`);
            }, 3000);
        }, 5000);

    }, timer);

};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
// 刷牙 3 秒鐘 -> 吃早餐 5 秒鐘 -> 寫功課 3 秒鐘
doWork('刷牙', '吃早餐', '寫功課', 3000, (err, data) => {
    console.log(data);
});