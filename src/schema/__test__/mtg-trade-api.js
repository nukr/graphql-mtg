import schema from '..'
import { graphql } from 'graphql'
import rootValue from '../rootValue'

export default (query) => {
  return graphql(schema, query, rootValue)
}
