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
  query GetBooksQuery($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        born
        bookCount
      }
    }
  }
`

export const GET_GENRES = gql`
  query Get {
    allBooks {
      genres
    }
  }
`

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`