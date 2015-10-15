import DataLoader from 'dataloader'
import { getUsers, getCards, getCardByName } from './query'

export default function createLoaders () {
  return {
    User: new DataLoader(ids => getUsers(ids)),
    Card: new DataLoader(name => getCardByName(name))
  }
}
