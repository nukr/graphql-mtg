import {
  GraphQLString
} from 'graphql'

export default refs => ({
  type: GraphQLString,
  resolve: async (root, args, info) => {
    return 'GG'
  }
})
