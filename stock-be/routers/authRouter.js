const express = require('express')
const router = express.Router()
const pool = require('../utils/DB')
const argon2 = require('argon2')

// 引入 validator 套件
const { body, validationResult, Result } = require('express-validator')

// TODO: 前端傳來的訊息(json)都放在 req.body(json) 裡面
// 用 req.body.key名稱 來取得資料(value)
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
router.post('/register', registerRule, async (req, res, next) => {
  console.log('register 結果', req.body)

  // 驗證資料
  const validatedResult = validationResult(req)
  console.log(validatedResult)

  // 結果若是空的 => 代表沒有錯誤
  // 若不是空的 => 回傳錯誤訊息
  if (!validatedResult.isEmpty()) {
    return res.status(400).json({ errors: validatedResult.array() })
  }

  // 檢查 email 是否已存在
  // 通常是 1筆或 0筆資料
  let [members] = await pool.execute('SELECT * FROM members WHERE email=?', [
    req.body.email,
  ])
  // 已存在時 回復錯誤
  if (members.length > 0) {
    // 註冊過回復錯誤訊息400
    return res.status(400).json({
      errors: [
        {
          msg: 'Email已存在',
          param: 'email',
        },
      ],
    })
  }
  console.log('檢查結果', members)

  // 雜湊 hash 密碼
  const handlePassword = await argon2.hash('password')

  // 存到資料庫
  let result = await pool.execute(
    'INSERT INTO members (email,password,name) VALUES (?,?,?)',
    [req.body.email, req.body.password, req.body.name]
  )

  // 回覆給前端

  res.json({
    email: req.body.email,
    member_id: result[0].insertId,
  })
})

module.exports = router
