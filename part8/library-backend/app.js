const mongoose = require('mongoose')
const { ApolloServer, gql, UserInputError, ForbiddenError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGDB_URI='mongodb://localhost/library'
const HARDCODED_PASS = 'secret'
const JWT_SECRET = 'secret'

mongoose.connect(MONGDB_URI)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(err => {
    console.log('Error conection to MongoDB', err.message)
  })

const typeDefs = gql`
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!,
    author: Author!,
    genres: [String!]!
    id: ID!,
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
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args, context) => {
      if(context && context.currentUser){
        let author = await Author.findOne({name: args.author})
        if(!author){
          author = new Author({
            name: args.author
          })
          await author.save()
        }
        const newBook = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })
        await newBook.save()
        return newBook
      } else{
        throw new ForbiddenError('Forbidden')
      }
    },
    editAuthor: async (root, args, context) => {
      if(context && context.currentUser){
        const author = await Author.findOne({name: args.name})
        if (author) {
          author.born = args.setBornTo
          await author.save()
          return author  
        }
      } else{
        throw new ForbiddenError('Forbidden')
      }
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })
      await user.save()
      return user
    },
    login: async (root, {username, password}) => {
      const user = await User.findOne({username: username})
      if(!user || password !== HARDCODED_PASS){
        throw new UserInputError('wrond credentials')
      }
      
      const token = jwt.sign({
        username: user.username,
        id: user._id
      }, JWT_SECRET)
      
      return {value: token }
    }
  },
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () =>  await Author.countDocuments(),
    allAuthors: async () =>  await Author.find(),
    me: (root, args, context) => {
      const { currentUser } = context
      return currentUser
    },
    allBooks: async (root, args) => {
      
      const byGenre = args.genre ? {genres: args.genre} : {}
      return await Book.find({...byGenre})
      //const byAuthorName = (book) => args.name ? book.author === args.name : true
      //const byGenre = (book) => args.genre ? book.genres.includes(args.genre) : true 
      /*return books
              .filter(byAuthorName)
              .filter(byGenre)*/

      
    },
  },
  Author: {
    bookCount: async (author) => await Book.countDocuments({author: author._id})
  },
  Book: {
    author: async (book) => (await book.populate('author')).author
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLocaleLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})