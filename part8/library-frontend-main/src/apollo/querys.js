import { gql } from '@apollo/client'


export const GET_AUTHORS = gql`
  query GetAuthorsQuery {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query GetBooksQuery {
    allBooks {
      title
      published
      author
    }
  }
`