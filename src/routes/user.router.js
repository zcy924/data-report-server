'use strict'

const Router = require('koa-router')
const User = require('../controllers/user')

var router = new Router()

// use
// DB Interface test

router // 以/public开头则不用经过权限认证
  .get('/getUsers', User.getUsers)
  .get('/getUserById/:id', User.getUserById)
export default router
