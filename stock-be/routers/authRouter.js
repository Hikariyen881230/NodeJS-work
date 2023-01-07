const express = require('express')
const router = express.Router()

router.post('/register', (req, res, next) => {
  console.log('register')
  // TODO: 驗證資料
  // TODO: 處理驗證結果

  // TODO: 檢查是否已經註冊過
  // TODO: 如果已經註冊過回復...

  // TODO: 雜湊 hash 密碼

  // TODO: 存到資料庫

  // TODO: 回覆給前端

  res.json({})
})

module.exports = router
