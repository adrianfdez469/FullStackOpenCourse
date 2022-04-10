import { useQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import FilteredBooks from "./FilteredBooks"


const GET_GENRES = gql`
  query Get {
    allBooks {
      genres
    }
  }
`

const Books = (props) => {

  
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)
  const { data } = useQuery(GET_GENRES)

  useEffect(() => {
    if(data && data.allBooks){
      const genresSet = new Set()
      data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          genresSet.add(genre)
        })
      })
      setGenres([...genresSet])
    }

  }, [data])

  const handleFilter = (gender) => {
    setFilter(gender)
  }

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      <FilteredBooks filter={filter}/>
      {genres.map(g => {
        return <button key={g} onClick={() => handleFilter(g)}>{g}</button>
      })}
    </div>
  )
}

export default Books
