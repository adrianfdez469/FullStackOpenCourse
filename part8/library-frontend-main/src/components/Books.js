import FilteredBooks from "./FilteredBooks"

const Books = ({show, genres, books, filter, setFilter}) => {

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <FilteredBooks filter={filter} books={books}/>
      {genres.map(g => {
        return <button key={g} onClick={() => setFilter(g)}>{g}</button>
      })}
    </div>
  )
}

export default Books
