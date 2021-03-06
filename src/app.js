import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import { System as SystemConfig } from './config'
import path from 'path'
import MainRoutes from './routes/main-routes'
import UserRoutes from './routes/user.router'
import SpaceRoutes from './routes/space-routers'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import mongoose from 'mongoose'
import jwt from 'koa-jwt'
import fs from 'fs'

mongoose.connect(
  'mongodb://localhost:27017/data-report', {useNewUrlParser: true},
  function (err) {
    if (err) {
      console.log('connect database fail')
    } else {
      console.log('connect database success')
    }
  }
)

// import PluginLoader from './lib/PluginLoader'

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

// const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))
app
  // .use(cors())
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  // .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/user\/login|\/assets/] }))
  .use(
    KoaBody({
      multipart: true,
      strict: false,
      formidable: {
        uploadDir: path.join(__dirname, '../assets/uploads/tmp')
      },
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb'
    })
  ) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
if (env === 'development') {
  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    if (ctx.url !== '/favicon.ico') {
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    }
  })
}
app
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(UserRoutes.routes())
  .use(UserRoutes.allowedMethods())
  .use(SpaceRoutes.routes())
  .use(SpaceRoutes.allowedMethods())
  .use(ErrorRoutes())

app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
