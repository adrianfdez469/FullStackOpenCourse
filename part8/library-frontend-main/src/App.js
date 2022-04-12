import { useEffect, useState } from 'react'
import { useApolloClient, useSubscription, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recomendations from './components/Recommendations'
import { SUB_PERSON_ADDED } from './apollo/subscriptions'
import { GET_BOOKS, GET_GENRES } from './apollo/querys'

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery({query: GET_BOOKS }, (data) => {
    console.log(data);
    return {
      allBooks: !data?.allBooks ? [addedBook] : [...data.allBooks, addedBook]
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [filter, setFilter] = useState()
  const {data: dataBooks} = useQuery(GET_BOOKS, {variables: {genre: filter}})
  const { data: dataGenres } = useQuery(GET_GENRES)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  useSubscription(SUB_PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData  }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`New book "${addedBook.title}" was added!`)
      updateCache(client.cache, {query: GET_BOOKS}, addedBook)
      }
  })

  useEffect(() => {
    if(dataBooks && dataBooks.allBooks){
      setBooks(dataBooks.allBooks)
    }
  }, [dataBooks])

  useEffect(() => {
    if(dataGenres && dataGenres.allBooks){
      const genresSet = new Set()
      dataGenres.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          genresSet.add(genre)
        })
      })
      setGenres([...genresSet])
    }
  }, [dataGenres])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => {setPage('recomendations')}}>Recomendations</button>
              <button onClick={handleLogout}>logout</button>
              
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} token={token}/>

      <Books show={page === 'books'} genres={genres} books={books} filter={filter} setFilter={setFilter}/>

      <NewBook show={page === 'add'} token={token}/>

      <Recomendations show={page === 'recomendations'} books={books}/>

      <Login show={page === 'login'} setToken={setToken}/>
    </div>
  )
}

export default App
