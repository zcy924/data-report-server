const Router = require('koa-router')
const Space = require('../controllers/space')
const Report = require('../controllers/report')
let router = new Router()
router
  .get('/getSpaces', Space.getSpaces)
  .get('/getReportsBySpaceId/:spaceId', Report.getReportById)
export default router
