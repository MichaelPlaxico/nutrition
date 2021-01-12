import { remove } from 'lodash'
const dessertsArray = [
  {
    id: 1,
    name: 'Turtle Cake',
    nutrition: {
      calories: 537,
      fat: 45,
      protein: 3,
      carbs: 30,
    },
  },
  {
    id: 2,
    name: 'Apple Pie',
    nutrition: {
      calories: 600,
      fat: 30,
      protein: 10,
      carbs: 20,
    },
  },
]

let mutableDessertsArray = dessertsArray.concat()

export default {
  Query: {
    desserts() {
      return mutableDessertsArray
    },
    dessert(parent, args) {
      console.log(args)
      const result = mutableDessertsArray.find(
        ({ id }) => id === parseInt(args.id)
      )
      console.log(result)
      return result
    },
  },
  Mutation: {
    createDessert(parent, dessert) {
      console.log('Creating dessert')
      mutableDessertsArray.push(dessert)
      return dessert
    },
    deleteDesserts(parent, deletionCandidates) {
      console.log(deletionCandidates)
      return remove(mutableDessertsArray, (dessert) => {
        console.log(dessert)
        deletionCandidates.ids.includes(dessert.id)
      })
    },
  },
}
