import { ApolloServer } from 'apollo-server'
import { remove } from 'lodash'
import schema from '#schema'

const PORT = 4001
let mockDesserts = [
  {
    id: 'someId1',
    name: 'Turtle Cake',
    nutrition: {
      calories: 537,
      fat: 45,
      protein: 3,
      carbs: 30,
    },
  },
  {
    id: 'someId2',
    name: 'Apple Pie',
    nutrition: {
      calories: 600,
      fat: 30,
      protein: 10,
      carbs: 20,
    },
  },
  {
    id: 'someId3',
    name: 'Giant Chocolate Chip Cookie',
    nutrition: {
      calories: 480,
      fat: 15,
      protein: 22,
      carbs: 64,
    },
  },
]

let mutableMockDesserts = mockDesserts.concat()

const mocks = {
  Query: () => ({
    desserts: () => {
      console.log('Yeah!')
      return mutableMockDesserts
    },
    dessert: (_, { id: dessertId }) => {
      return mutableMockDesserts.find(({ id }) => dessertId === id)
    },
  }),
  Mutation: () => ({
    createDessert: (_, dessert) => {
      console.log('Creating dessert from server.js', dessert)
      mutableMockDesserts.push(dessert)
      return dessert
    },
    deleteDesserts: (_, { ids }) => {
      return remove(mutableMockDesserts, (dessert) => {
        return ids.includes(dessert.id)
      })
    },
  }),
}

const server = new ApolloServer({
  schema,
  mocks,
})

server.listen(PORT).then(({ url }) => {
  console.log(`Server is running at ${url}.`)
})
