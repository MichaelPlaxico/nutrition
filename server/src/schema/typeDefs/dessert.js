const DessertBase = `
  id: ID!
  name: String!
  nutrition: Nutrition
`

export default `
  type Dessert {
    ${DessertBase}
  }

  type Query {
    desserts: [Dessert]
    dessert(id: ID!): Dessert
  }

  type Mutation {
    createDessert(id: ID!, name: String!, nutrition: NutritionInput!): Dessert
    deleteDesserts(ids: [ID!]): [Dessert]
  }
`
