import { gql } from 'graphql-request'

export default gql`
  mutation createDessert(
    $id: ID!
    $name: String!
    $nutrition: NutritionInput!
  ) {
    createDessert(id: $id, name: $name, nutrition: $nutrition) {
      id
    }
  }
`
