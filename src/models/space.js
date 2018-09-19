import mongoose from 'mongoose'
let Schema = mongoose.Schema
export let SpaceSchema = new Schema({
  spaceId: String,
  spaceName: String
})
