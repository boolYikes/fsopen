import { gql } from '@apollo/client'

// use with ${} in other queries
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      id
      born
    }
    published
    genres {
      id
      name
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books {
        title
        published
        id
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

// value is a token
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      username
      favoriteGenre
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $favoriteGenre: String
  ) {
    createUser(
      username: $username
      password: $password
      favoriteGenre: $favoriteGenre
    ) {
      username
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres {
      name
      id
    }
  }
`

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($id: String) {
    findBooksByGenre(id: $id) {
      name
      id
      books {
        title
        published
        author {
          name
        }
        id
      }
    }
  }
`
