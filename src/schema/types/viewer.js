import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql'

export default refs => new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    cards: {
      type: new GraphQLList(refs.card),
      args: {
        cardName: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => root.loaders.Card.load(args.cardName)
    }
  })
})
