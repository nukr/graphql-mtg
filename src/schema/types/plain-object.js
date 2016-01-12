import {
  GraphQLScalarType
} from 'graphql'

export default refs => new GraphQLScalarType({
  name: 'PlainObject',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral: ast => ast.value
})
