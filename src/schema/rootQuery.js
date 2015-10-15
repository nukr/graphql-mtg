import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

export default refs => {
  return new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      node: refs.nodeField,
      viewer: {
        type: refs.viewer,
        resolve: root => root
      },
      search: {
        type: new GraphQLList(refs.card),
        args: {
          cardName: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => (
          root.db.search({
            cardName: args.cardName
          })
        )
      }
    })
  })
}
