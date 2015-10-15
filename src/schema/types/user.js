import {
  GraphQLString,
  GraphQLObjectType,
} from 'graphql'

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay'

import {
  getCardBySet
} from '../../query'

export default refs => new GraphQLObjectType({
  name: 'User',
  description: 'The user',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString
    },
    cards: {
      type: refs.cardConnection,
      description: `A person's collection cards`,
      args: {
        cardName: {type: GraphQLString},
        setName: {type: GraphQLString},
        ...connectionArgs
      },
      resolve: async (_, args) => {
        let result = await getCardBySet(args.setName)
        return connectionFromArray(result, args)
      }
    }
  }),
  interfaces: [refs.nodeInterface]
})
