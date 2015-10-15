import { GraphQLSchema } from 'graphql'
import * as types from './types'
import rootQuery from './rootQuery'
import { log } from '../utils'
import {
  nodeDefinitions,
  connectionDefinitions,
  fromGlobalId
} from 'graphql-relay'

const refCreators = {
  rootQuery,
  ...types
}

let { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, info) => {
    const {rootValue} = info
    const {type, id} = fromGlobalId(globalId)
    console.log('@@@@@@ idFetcher')
    return rootValue.loaders[type].load(id)
  },
  object => {
    log('typeResolver', refs['user']._fields.id.resolve.toString())
    // const label = object.labels[0]
    // const refKey = label[0].toLowerCase() + label.slice(1)
    return refs['user']
  }
)

const refs = Object.keys(refCreators)
  .reduce((acc, key) => (
    acc[key] = refCreators[key](acc),
    acc[key + 'Connection'] = connectionDefinitions({
      name: acc[key].name,
      nodeType: acc[key]
    }).connectionType,
    acc
  ), {nodeInterface, nodeField})

export default new GraphQLSchema({
  query: refs.rootQuery
})
