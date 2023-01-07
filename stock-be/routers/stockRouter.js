const express = require('express')
// 利用 express 這個框架建立一個 router
// app 能做 router 也能做( app.use , app.get/post ) 除了 listen
const router = express.Router()

const pool = require('../utils/DB')

// router.get('/api', (req, res, next) => {
//   res.json({
//     name: 'John',
//     age: '15,',
//   })
// })

// 建立第一個stock api
router.get('/', async (req, res, next) => {
  // 從資料表撈資料
  let [data] = await pool.query('SELECT * FROM stocks')
  res.json(data)
})

router.get('/:stockId', async (req, res, next) => {
  console.log('/api/stocks/:stockId=>', req.params.stockId)
  // 用 ? + 陣列的方式避免SQL injection
  // let [data] = await pool.query('SELECT * FROM stock_prices WHERE stock_id=?', [
  //   req.params.stockId,
  // ])
  // console.log('get data,', data)

  // TODO: 01/27做分頁
  // 從前端拿到目前是要第幾頁
  // 通常會放在 query string -> req.query.page(根據 ? 後面接的字串來決定)
  // api/stocks/:stockId?page=2
  // 如果第一頁沒有 page=1(undefined) 的 query string 就預設為1
  const page = req.query.page || 1

  // 有幾筆資料
  let [result] = await pool.execute(
    'SELECT COUNT (*) AS total FROM stock_prices WHERE stock_id=?',
    [req.params.stockId]
  )
  console.log('SET/stocks/details =>', result)

  // const total = result[0] // output: [ { total: 34 } ]
  const total = result[0].total // output: [ { total: 34 } ]

  // 總共有幾頁
  const perPage = 5
  const totalPage = Math.ceil(total / perPage)
  // 計算 offset ,limit (一頁幾筆)
  const limit = perPage
  const offset = limit * (page - 1)
  // 根據 offset 和 limit 取得資料
  let [data] = await pool.execute(
    'SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?',
    [req.params.stockId, perPage, offset]
  )
  // 回覆給前端
  res.json({
    pagination: {
      perPage: perPage,
      totalPage, // 變數名稱跟 key名稱一樣 可以直接放進來
      page,
    },
    data,
  })
  // res.json(data)
})

router.post('/', async (req, res, next) => {
  // 從資料表撈資料 要使用 req.body
  console.log('POST/api/stocks', req.body)
  let { stockId, stockName } = req.body
  console.log('解構資料', stockId, stockName)
  await pool.query('INSERT INTO stocks (id,name) VALUES (?,?)', [
    stockId,
    stockName,
  ])
  res.json({ result: 'ok' })
})

module.exports = router
