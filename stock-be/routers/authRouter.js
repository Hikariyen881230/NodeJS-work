const express = require('express')
const router = express.Router()
// 引入 validator 套件
const { body, validationResult } = require('express-validator')

const registerRule = [
  // 每一行都是一個中間件
  body('email').isEmail().withMessage('請輸入正確格式的Email'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  // 自定義中間件 檢查 password 跟 confirmPassword 是否一致
  body('confirmPassword').custom((value, { req }) => {
    return value === req.body.password
  }),
]
// TODO: validator 中間件檢查的結果都放在 req 裡面
router.post('/register', registerRule, (req, res, next) => {
  console.log('register 結果', req.body)

  // TODO: 驗證資料
  const validatedResult = validationResult(req)
  console.log(validatedResult)

  // 結果若是空的 => 代表沒有錯誤
  // 若不是空的 => 回傳錯誤訊息
  if (!validatedResult.isEmpty()) {
    return res.status(400).json({ errors: validatedResult.array() })
  }

  // TODO: 處理驗證結果

  // TODO: 檢查是否已經註冊過
  // TODO: 如果已經註冊過回復...

  // TODO: 雜湊 hash 密碼

  // TODO: 存到資料庫

  // TODO: 回覆給前端

  res.json({})
})

module.exports = router
