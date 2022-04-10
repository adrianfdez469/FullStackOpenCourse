
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_BOOKS } from '../apollo/querys'

const FilteredBooks = ({ filter }) => {
  

  const {data} = useQuery(GET_BOOKS, {variables: {genre: filter}})
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(data && data.allBooks){
      setBooks(data.allBooks)
    }
  }, [data])


  return (
    <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(books => filter ? books.genres.includes(filter): true)
            .map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default FilteredBooks