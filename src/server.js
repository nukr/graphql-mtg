import koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import parse from 'co-body'
import schema from './schema'
import { graphql } from 'graphql'
import { log } from './utils'
import db from './db'

let app = koa()
let router = Router()

router.post('/graphql', function * (next) {
  let body = yield parse.json(this)
  log('Query from relay', body.query)

  let rootValue = {
    locale: this.cookies.get('locale') || 'en',
    db
  }

  this.body = yield graphql(
    schema,
    body.query,
    rootValue
  )
})

router.get('/', function * () {
  this.body = 'gg'
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(12345)
console.log('server listen on port 12345')
