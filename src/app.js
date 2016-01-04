import Koa from 'koa'
import Router from 'koa-router'
import parse from 'co-body'
import graphiql from 'koa-graphiql'
import schema from './schema'
import { graphql } from 'graphql'
import { log } from './utils'
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
    rootValue
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

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(12345)
console.log('server listen on port 12345')
