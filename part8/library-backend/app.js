const { ApolloServer, gql } = require('apollo-server')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  enum Genre {
    classic
    revolution
    crime
    refactoring
    design
    patterns
    agile
  }

  type Book {
    title: String!
    published: Int!,
    author: String!,
    id: ID!,
    genres: [Genre!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: Genre): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!,
      author: String!,
      genres: [Genre!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!) : Author
  }
`

const genId = () => (10000 * Math.random()).toFixed(0)

const resolvers = {
  Mutation: {
    addBook: (root, args) => {
      let author = authors.find(a => a.name === args.author) 
      if(!author){
        author = {id: genId(), name: args.author}
      }
      authors = authors.concat(author)
      const newBook = {...args, id: genId()}
      books = books.concat(newBook)
      return newBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (author) {
        author.born = args.setBornTo
        authors = authors.map(a => a.id === author.id ? author : a)
        return author  
      }
    }
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const byName = (book) => args.name ? book.author === args.name : true
      const byGenre = (book) => args.genre ? book.genres.includes(args.genre) : true 
      return books
              .filter(byName)
              .filter(byGenre)
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => books.filter(b => root.name === b.author).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})