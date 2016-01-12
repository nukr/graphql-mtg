import { GraphQLList } from 'graphql'
import elasticsearch from 'elasticsearch'
const client = new elasticsearch.Client({
  host: 'elasticsearch:9200'
})

export default refs => ({
  type: new GraphQLList(refs.card),
  args: {
    params: {
      type: refs.plainObject
    }
  },
  resolve: async (root, args, info) => {
    let params = {
      index: 'mtg',
      type: 'cards',
      ...args.params
    }

    let result = await client.search(params)
    return result.hits.hits.map(hit => hit._source.data)
  }
})
