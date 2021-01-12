import { gql } from 'graphql-request'

export default gql`
  query {
    desserts {
      id
      name
      nutrition {
        calories
        protein
        fat
        carbs
      }
    }
  }
`
