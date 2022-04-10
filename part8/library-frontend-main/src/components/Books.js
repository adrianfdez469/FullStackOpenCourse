import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_BOOKS } from '../apollo/querys'

const Books = (props) => {

  const [books, setBooks] = useState([])
  const { data } = useQuery(GET_BOOKS)

  useEffect(() => {
    if(data && data.allBooks)
    setBooks(data.allBooks)
  }, [data])

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
