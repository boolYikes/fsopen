import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books {
        title
        published
        id
        genres
      }
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
        born
        id
      }
      title
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      id
      title
      author {
        name
        id
        born
      }
      published
      genres
    }
  }
`

export const UPDATE_BIRTH = gql`
  mutation updateBirth($born: Int!, $author: String!) {
    updateBirth(born: $born, author: $author) {
      name
      born
      id
    }
  }
`
