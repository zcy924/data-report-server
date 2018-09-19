import mongoose from 'mongoose'
import { SpaceSchema } from '../models/space'
let space = mongoose.model('spaces', SpaceSchema)
export let getSpaces = async (ctx, next) => {
  try {
    let list = await space.find({})
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
