import { useMutation } from '@apollo/client'
import { SET_AUTHOR_YEAR_BY_NAME } from '../apollo/mutations'
import { GET_AUTHORS } from '../apollo/querys'

const EditBirthday = (props) => {

  const [ setAuthorYear ] = useMutation(SET_AUTHOR_YEAR_BY_NAME, {
    refetchQueries: [{query: GET_AUTHORS}]
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(event.target.author.value);

    setAuthorYear({variables: {
      name: event.target.author.value, 
      year: +event.target.year.value
    }})

    event.target.author.value = ''
    event.target.year.value = ''
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select name='author'>
            {props.authors.map(author => (<option key={author.name} value={author.name}>{author.name}</option>))}
          </select>
        </div>
        <div>
          born
          <input
            name='year'
            type="number"
          />
        </div>
        <button>update author</button>
      </form>
    </>
  )

}

export default EditBirthday