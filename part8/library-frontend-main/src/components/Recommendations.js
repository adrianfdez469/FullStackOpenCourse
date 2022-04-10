import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import FilteredBooks from './FilteredBooks'


export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`

const Recomendations = ({show}) => {

  const { data } = useQuery(ME)
  const [user, setUser] = useState()

  useEffect(() => {
    if(data && data.me){
      setUser(data.me)
    }
  }, [data])

  if(!show){
    return null
  }

  return (
    <>
      <h2>Recomendations</h2>
      <div>books in your favorite genre <b>{user.favoriteGenre}</b></div>
      <FilteredBooks filter={user.favoriteGenre} />
    </>
  )

}
export default Recomendations