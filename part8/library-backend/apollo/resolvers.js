const { UserInputError, ForbiddenError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')

const { HARDCODED_PASS, JWT_SECRET } = require('../globals');

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
        
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Author: {
    bookCount: async (author) => await Book.countDocuments({author: author._id})
  },
  Book: {
    author: async (book) => (await book.populate('author')).author
  }
}

module.exports = resolvers