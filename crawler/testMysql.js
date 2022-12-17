// install mysql2
const mysql2 = require("mysql2/promise");
// install dotenv
require("dotenv").config();

(async () => {
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
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
