import Koa from 'koa'
import Router from 'koa-router'
// import cors from 'koa-cors'
import parse from 'co-body'
import schema from './schema'
import { graphql } from 'graphql'
import { log } from './utils'
import db from './db'

let app = new Koa()
let router = Router()

router.post('/graphql', async function (context, next) {
  let body = await parse.json(this)
  log('Query from relay', body.query)

  let rootValue = {
    locale: context.cookies.get('locale') || 'en',
    db
  }

  context.body = await graphql(
    schema,
    body.query,
    rootValue
  )
})

router.get('/', function (context, next) {
  context.body = 'gg'
})

// app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(12345)
console.log('server listen on port 12345')
