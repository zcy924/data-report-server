import mongoose from 'mongoose'
let Schema = mongoose.Schema
export let ReportSchema = new Schema({
  spaceId: String,
  reportId: String,
  reportName: String
})
