const express = require('express')
// 利用 express 這個框架建立一個 web app
const app = express()
const mysql2 = require('mysql2/promise')
require('dotenv').config()

// 設計一個連線池
let pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  // 設定連線數上限
  connectionLimit: 10,
  // 將日期設定為字串
  dateStrings: true,
})

// 利用cors 允許跨源存取
const cors = require('cors')
app.use(cors())

// middleware => pipeline pattern

// 設定express處理靜態檔案
// 不需要安裝任何東西
// 預設在首頁
// app.use(express.static('./static'))
// 設定一個前綴路徑
app.use('/2048', express.static('./static'))

// 中間件
app.use((req, res, next) => {
  console.log('這裡是的一個中間件 A')
  req.mfee31 = '水母班'
  next()
  // res.send('這裡是 A 中間件');
})

app.use((req, res, next) => {
  console.log('這裡是的一個中間件 B')
  req.dt = new Date().toISOString()
  next()
})

// app.[Method]
// get, post, put, patch, delete, option, head
// 路由中間件
app.get('/', (req, res, next) => {
  console.log('這裡是首頁 2', req.mfee31, req.dt)
  res.send('Hello Express 9')
})

// app.get('/api', (req, res, next) => {
//   res.json({
//     name: 'John',
//     age: '15,',
//   })
// })

// 建立第一個stock api
app.get('/api/stocks', async (req, res, next) => {
  // 從資料表撈資料
  let [data] = await pool.query('SELECT * FROM stocks')
  res.json(data)
})

app.get('/api/stocks/:stockId', async (req, res, next) => {
  console.log('/api/stocks/:stockId=>', req.params.stockId)
  // 用? +陣列的方式避免SQL injection
  let [data] = await pool.query('SELECT * FROM stock_prices WHERE stock_id=?', [
    req.params.stockId,
  ])
  console.log('get data,', data)
  res.json(data)
})

app.use((req, res, next) => {
  console.log('這裡是的一個中間件 C')
  next()
})

app.get('/test', (req, res, next) => {
  console.log('這裡是 test 頁面', req.dt)
  res.send('Hello Test 1')
  next()
})

// 放在所有的路由中間件的後面
// 前面所有的路由都比不到對的網址時，就會掉到這裡來
// --> 這就是一個 404 的情況
// 利用了中間件會依照程式碼順序來執行的特性
app.use((req, res) => {
  console.log('這裡是 404')
  res.send('沒有這個網頁啦')
})

app.listen(3001, () => {
  console.log('Server running at port 3001')
})

// 網頁的請求可能不只有一個，瀏覽器會有預設請求例如 : favicon
// 這時候會再跑一次app.use => 找不到時會跑到404
