import { GraphQLObjectType } from 'graphql'
import * as fields from './rootMutationFields'
import { attachFields } from './utils'

export default refs => new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => attachFields(refs, fields)
})
