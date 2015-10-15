import {
  GraphQLString,
  GraphQLObjectType,
} from 'graphql'

import {
  globalIdField,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'

import {
  getCardByName
} from '../../query'

export default refs => new GraphQLObjectType({
  name: 'Search',
  description: 'Search Type',
  fields: () => ({
    id: globalIdField('Search'),
    cards: {
      type: refs.cardConnection,
      args: {
        cardName: {
          type: GraphQLString
        },
        ...connectionArgs
      },
      resolve: async (_, args) => {
        let result = await getCardByName(args.cardName)
        return connectionFromArray(result, args)
      }
    }
  }),
  interfaces: [refs.nodeInterface]
})
