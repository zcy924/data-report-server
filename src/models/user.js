var mongoose = require('mongoose')
var Schema = mongoose.Schema
export let UserSchema = new Schema({
  userName: String,
  age: Number,
  passWord: String
})
