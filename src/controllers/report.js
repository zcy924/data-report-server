import mongoose from 'mongoose'
import { ReportSchema } from '../models/report'
let report = mongoose.model('reports', ReportSchema)
export let getReportById = async (ctx, next) => {
  try {
    let queryParams = ctx.params.spaceId
    let list = await report.find({ spaceId: queryParams })
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
