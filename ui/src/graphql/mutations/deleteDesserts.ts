import { gql } from 'graphql-request'

export default gql`
  mutation deleteDesserts($ids: [ID!]) {
    deleteDesserts(ids: $ids) {
      id
      name
    }
  }
`
