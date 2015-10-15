import koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import parse from 'co-body'
import schema from './schema'
import createLoaders from './createLoaders'
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
    loaders: createLoaders(),
    db
  }

  this.body = yield graphql(
    schema,
    body.query,
    rootValue
  )
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(12345)
