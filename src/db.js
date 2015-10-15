import rethinkdbdash from 'rethinkdbdash'
import config from '../config'

let r = rethinkdbdash(config.rethinkdb)

export function search (options) {
  return r.db('mtg').table('cards').filter({name: options.cardName}).run()
}
