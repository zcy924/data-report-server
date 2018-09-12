// var userHelper = require('../dbhelper/userHelper')
var mongoose = require('mongoose')
var UserSchema = require('../models/user')
var User = mongoose.model('users', UserSchema)
exports.getUsers = async (ctx, next) => {
  try {
    let list = await User.find({})
    ctx.body = {
      success: true,
      retList: list
    }
  } catch (error) {
    ctx.body = {
      success: false,
      retList: 'error'
    }
  }
}
