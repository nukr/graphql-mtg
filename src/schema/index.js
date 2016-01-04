import { GraphQLSchema } from 'graphql'
import * as types from './types'
import rootQuery from './rootQuery'
import rootMutation from './rootMutation'

let refsCreators = {
  ...types,
  rootQuery,
  rootMutation
}

const refs = Object.keys(refsCreators)
        .reduce((obj, key) => (
          obj[key] = refsCreators[key](obj),
          obj
        ), {})

export default new GraphQLSchema({
  query: refs.rootQuery,
  mutation: refs.rootMutation
})
