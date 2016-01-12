import Koa from 'koa'
import Router from 'koa-router'
import parse from 'co-body'
import graphiql from 'koa-graphiql'
import logger from 'koa-logger'
import { graphql } from 'graphql'
import schema from './schema'
import db from './db'

let app = new Koa()
let router = Router()

router.post('/graphql', async function (context, next) {
  let body = await parse.json(context)
  let rootValue = {
    locale: context.cookies.get('locale') || 'en',
    db
  }

  context.body = await graphql(
    schema,
    body.query,
    rootValue,
    body.variables ? JSON.parse(body.variables) : {}
  )
})

router.get('/', function (context, next) {
  context.body = 'gg'
})

router.get('/graphiql', graphiql(async ctx => ({
  url: '/graphql',
  variables: {
    token: 'gggg'
  }
})))

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(12345)
console.log('server listen on port 12345')
