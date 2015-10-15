import {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql'

export default refs => new GraphQLObjectType({
  name: 'Set',
  description: 'The set in MTG',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The set name'
    },
    code: {
      type: GraphQLString,
      description: `The set's code`
    },
    gathererCode: {
      type: GraphQLString,
      description: `The code that Gatherer uses for the set. Only present if
      different that 'code'`
    },
    oldCode: {
      type: GraphQLString,
      description: `AN old style code used by some MAgic software. Only present
      if different that 'gathererCode' and 'code'`
    },
    magicCardsInfoCode: {
      type: GraphQLString,
      description: `The code that magiccards.info uses for the set. Only present
      if magiccards.info has this set`
    },
    releaseDate: {
      type: GraphQLString,
      description: `When the set was released (YYYY-MM-DD). for promo sets, the
      date the first card was released.`
    },
    border: {
      type: GraphQLString,
      description: `The type of border on the cards, either "white", "black", or
      "silver"`
    },
    type: {
      type: GraphQLString,
      description: `Type of set.`
    },
    block: {
      type: GraphQLString,
      description: 'The block this set is in'
    },
    onlineOnly: {
      type: GraphQLBoolean,
      description: 'Present and set to true if the set was only released online'
    },
    booster: {
      type: new GraphQLList(GraphQLString),
      description: 'Booster contents for this set'
    },
    cards: {
      type: new GraphQLList(refs.card),
      description: 'Cards of this set',
      resolve: (set) => {
        console.log(set)
      }
    }
  })
})

