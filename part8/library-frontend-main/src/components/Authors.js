import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { GET_AUTHORS } from '../apollo/querys'
import EditBirthday from './EditBirthday'




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
      <EditBirthday authors={authors}/>
    </div>
    
  )
}

export default Authors
