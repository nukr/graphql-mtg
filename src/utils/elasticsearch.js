#!/usr/bin/env babel-node --stage 0
/*eslint spaced-comment: [2, "never"]*/
import { activateRiver } from 'elastic-rethinkdb'
import config from '../../config'

async () => {
  let response = await activateRiver({
    dbName: 'mtg',
    tableName: 'cards',
    elasticsearch: {
      ...config.elasticsearch
    },
    rethinkdb: {
      ...config.rethinkdb
    }
  })
  let result = await response.json()
  console.log(result)
}().catch(console.log)
