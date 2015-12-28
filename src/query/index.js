import rethinkdbdash from 'rethinkdbdash'
import fetch from 'node-fetch'
import config from '../../config'

let r = rethinkdbdash(config.rethinkdb)
class User extends Object {}

let user = new User()
user.id = '1'
user.name = 'Anonymous'

export default {
  getUsers: (ids) => Promise.resolve([user]),

  getCards: (ids) => r.db('mtg').table('cards').getAll(ids).run(),

  getSet: (id) => r.db('mtg').table('sets').get(id).run(),

  getSampleCard: (size) => r.db('mtg').table('cards').sample(size).run(),

  getSampleSet: (size) => r.db('mtg').table('sets').sample(size).run(),

  getCardBySet: (setCode) => r.db('mtg')
    .table('cards')
    .filter({code: setCode})
    .run(),

  getCardByName: (cardNames) => {
    let requests = cardNames.map(cardName => fetch('http://192.168.184.5:9200/mtg/cards/_search', {
      method: 'post',
      body: JSON.stringify({
        query: {
          match: {
            name: cardName
          }
        }
      })
    })
    .then(response => response.json())
    .then(result => result.hits.hits.map(hit => hit._source)))
    return Promise.all(requests)
  },

  getSetByCode: (setCode) => {
    return r.db('mtg').table('sets').filter({code: setCode}).nth(0).run()
  },

  User
}
