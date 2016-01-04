import { GraphQLObjectType } from 'graphql'
import * as fields from './rootQueryFields'
import { attachFields } from './utils'

export default refs => new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => attachFields(refs, fields)
})
