import {
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'

let foreignNameType = new GraphQLObjectType({
  name: 'ForeignName',
  description: 'The card foreign name',
  fields: {
    language: {
      type: GraphQLString,
      description: 'The foreign name language'
    },
    name: {
      type: GraphQLString,
      description: 'The foreign name'
    },
    multiverseid: {
      type: GraphQLInt,
      description: 'The foreign name multiverseid'
    }
  }
})

let rulingType = new GraphQLObjectType({
  name: 'Ruling',
  description: 'The card ruling',
  fields: {
    date: {
      type: GraphQLString,
      description: 'The ruling date'
    },
    text: {
      type: GraphQLString,
      description: 'The ruling text'
    }
  }
})

let legalityType = new GraphQLObjectType({
  name: 'Legality',
  description: 'The card Legality',
  fields: {
    format: {
      type: GraphQLString,
      description: 'The legality format'
    },
    legality: {
      type: GraphQLString,
      description: 'The legality type'
    }
  }
})

export default refs => new GraphQLObjectType({
  name: 'Card',
  description: 'A card in MTG',
  fields: () => ({
    code: {
      type: GraphQLString,
      description: 'Foreign key for set'
    },
    layout: {
      type: GraphQLString,
      description: `Possible values: normal, split, flip, double-faced, token,
      plane, scheme, phenomenon, leveler, vanguard`
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The card name'
    },
    names: {
      type: new GraphQLList(GraphQLString),
      description: 'Only used for split, flip and double-faced cards'
    },
    manaCost: {
      type: GraphQLString,
      description: 'The mana cost of the card'
    },
    cmc: {
      type: GraphQLFloat,
      description: 'Converted mana cost'
    },
    colors: {
      type: new GraphQLList(GraphQLString),
      description: 'The card colors'
    },
    type: {
      type: GraphQLString,
      description: 'The card type'
    },
    supertypes: {
      type: new GraphQLList(GraphQLString),
      description: 'The supertypes of the card. Example: Basic, Legendary, Snow'
    },
    types: {
      type: new GraphQLList(GraphQLString),
      description: 'The types of the card.'
    },
    subtypes: {
      type: new GraphQLList(GraphQLString),
      description: 'The subtypes of the card'
    },
    rarity: {
      type: GraphQLString,
      description: 'The rarity of the card'
    },
    text: {
      type: GraphQLString,
      description: 'The text of the card'
    },
    flavor: {
      type: GraphQLString,
      description: 'The flavor text of the card'
    },
    artist: {
      type: GraphQLString,
      description: 'The artist of the card'
    },
    number: {
      type: GraphQLString,
      description: 'The card number'
    },
    power: {
      type: GraphQLString,
      description: 'The power of the card'
    },
    toughness: {
      type: GraphQLString,
      description: 'The toughtness of the card'
    },
    loyalty: {
      type: GraphQLInt,
      description: 'The loyalty of the card'
    },
    multiverseid: {
      type: GraphQLInt,
      description: `the multiverseid of the card on Wizard's Gatherer web page.`
    },
    variations: {
      type: new GraphQLList(GraphQLInt),
      description: `If a card has alternate art then each other variation's
      multiverseid will be listed here, NOT including the current card's
      multiverseid. NOTE: Only present for sets that exist on Gatherer.`
    },
    imageName: {
      type: GraphQLString,
      description: `This used to refer to the mtgimage.com file name for this
      card.
      mtgimage.com has been SHUT DOWN by Wizards of the Coast.`
    },
    watermark: {
      type: GraphQLString,
      description: `The watermark on the card. Note: Split cards don't currently
      have this field set, despite have a watermark on each side of the split
      card`
    },
    border: {
      type: GraphQLString,
      description: `If the vorder for this specific card is DIFFERENT than the
      border specified in the top level set JSON, then it will be specified
      here.`
    },
    timeshifted: {
      type: GraphQLBoolean,
      description: 'If this card was a timeshifted card in the set'
    },
    hand: {
      type: GraphQLInt,
      description: 'Maximum hand size modifier. Only exists for Vanguard cards.'
    },
    life: {
      type: GraphQLInt,
      description: `Starting life total modifier. Only exists for Vanguard
      cards.`
    },
    reserved: {
      type: GraphQLBoolean,
      description: 'Set to true if this card is reserved by Wizards'
    },
    releaseDate: {
      type: GraphQLString,
      description: `The date this card was released. This is only set for promo
      cards. The date may not be accurate to an exact day and month, thus only a
      partial date may be set (YYYY-MM-DD of YYYY-MM or YYYY). Some promo cards
      do not have a known release data`
    },
    starter: {
      type: GraphQLBoolean,
      description: `Set to true if this card was only released as part of a core
      box set. These are technically part of the core sets and are tournament
      legal despite not being available in boosters`
    },
    rulings: {
      type: new GraphQLList(rulingType),
      description: `The rulings for the card. An array of objects, each object
      having 'date' and 'text' keys.`
    },
    foreignNames: {
      type: new GraphQLList(foreignNameType),
      description: `Foreign language names for the card, if this card in this
      set was printed in another language. An array of objects, each object
      having 'language', 'name' and 'multiverseid' keys. Not available for all
      sets.`
    },
    printings: {
      type: new GraphQLList(GraphQLString),
      description: `The sets that this card was printed in, expressed as an
      array of set codes`
    },
    originalText: {
      type: GraphQLString,
      description: `The original text on the card at the time it was printed.
      This field is not available for promo cards.`
    },
    originalType: {
      type: GraphQLString,
      description: `The original type on the card at the time it was printed.
      This field is not available for promo cards`
    },
    legalities: {
      type: new GraphQLList(legalityType),
      description: `Which formats this card is legal, restricted or banned in.
      An Array of objects, each object having 'format' and 'legality'. A
      'condition' key may be added in the future if Gatherer decides to utilize
      it again.`
    },
    source: {
      type: GraphQLString,
      description: `For promo cards, this is where this card was originally
      obtained. For box sets that are theme decks, this is which theme deck the
      card is from. For clash packs, this is which deck it is from`
    },
    set: {
      type: refs.set,
      description: 'Set information of this card'
    }
  })
})
