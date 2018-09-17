// var userHelper = require('../dbhelper/userHelper')
import mongoose from 'mongoose'
import {UserSchema} from '../models/user'
// var mongoose = require('mongoose')
// var UserSchema = require('../models/user')
var User = mongoose.model('users', UserSchema)

export let getUsers = async (ctx, next) => {
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

export let getUserById = async (ctx, next) => {
  console.log(ctx)
}
