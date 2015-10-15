/* global describe, it */
import { expect } from 'chai'
import mtgTradeApi from './mtg-trade-api'

describe('Search', () => {
  it('search by cardName', async () => {
    let query = `{
      search(cardName: "Black Lotus") {
        id
        name
        originalText
      }
    }`
    let result = await mtgTradeApi(query)
    let card = result.data.search[0]
    expect(card).to.have.property('id')
    expect(card).to.have.property('name')
    expect(card).to.have.property('originalText')
    expect(card.name).to.be.equal('Black Lotus')
  })
})
