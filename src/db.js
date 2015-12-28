import config from '../config'
import fetch from 'node-fetch'

export async function search (options) {
  let response = await fetch(`http://192.168.184.5:9200/mtg/cards/_search?q=name:${options.cardName}`, {
    method: 'get'
  })

  let result = await response.json()
  console.log(result.hits.hits)
  return result.hits.hits
}
