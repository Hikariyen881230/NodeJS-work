let doWork = function (job, timer, job2, timer2, job3, timer3, cb) {

    setTimeout(() => {
        let now = new Date();
        cb(null, `完成工作 ${job} at ${now.toISOString()}`);

        setTimeout(() => {
            let now = new Date();
            cb(null, `完成工作 ${job2} at ${now.toISOString()}`);

            setTimeout(() => {
                let now = new Date();
                cb(null, `完成工作 ${job3} at ${now.toISOString()}`);
            }, timer3);
        }, timer2);

    }, timer);

};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
// 刷牙 3 秒鐘 -> 吃早餐 5 秒鐘 -> 寫功課 3 秒鐘
doWork('刷牙', 3000, '吃早餐', 5000, '寫功課', 3000, (err, data) => {
    console.log(data);
});