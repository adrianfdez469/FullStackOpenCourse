import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { SET_AUTHOR_YEAR_BY_NAME } from '../apollo/mutations'
import { GET_AUTHORS } from '../apollo/querys'

const AuthorEdit = (props) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ setAuthorYear ] = useMutation(SET_AUTHOR_YEAR_BY_NAME, {
    refetchQueries: [{query: GET_AUTHORS}]
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthorYear({variables: {name, year}})

    setName('')
    setYear('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={(event) => handleChange(event)}>
            {props.authors.map(author => (<option key={author.name} value={author.name}>{author.name}</option>))}
          </select>
        </div>
        <div>
          born
          <input
            value={year}
            type="number"
            onChange={({ target }) => setYear(+target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </>
  )

}


const Authors = (props) => {
  
  const [authors, setAuthors] = useState([])
  const { data } = useQuery(GET_AUTHORS)
  
  useEffect(() => {
    if(data && data.allAuthors)
      setAuthors(data.allAuthors)
    
  }, [data])
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit authors={authors}/>
    </div>
    
  )
}

export default Authors
