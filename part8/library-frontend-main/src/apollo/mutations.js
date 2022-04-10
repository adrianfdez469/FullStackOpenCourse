import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author
      id
      genres
    }
  }
`

export const SET_AUTHOR_YEAR_BY_NAME = gql`
  mutation setAuthorYear($name: String!, $year: Int!){
    editAuthor(name: $name, setBornTo: $year){
      id
      name
      born
      bookCount
    }
  }
`