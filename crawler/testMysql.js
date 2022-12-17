const mysql2 = require("mysql2/promise");

(async () => {
  const connection = await mysql2.createConnection({
    host: "localhost", //或是127.0.0.1
    port: 3306,
    user: "admin",
    password: "",
    database: "stock_mfee31",
  });

  // simple query
  // 利用解構來簡化寫法
  let [result, fields] = await connection.query("SELECT * FROM `stocks`");
  // let data = result[0];
  // console.log(result);
  console.log(result);

  // 中斷連線
  connection.end();
})();
